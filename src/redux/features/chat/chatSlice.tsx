import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { ChatChoices, ChatLog, ChatMessage } from "../../../types/openAI";

import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
import { RootState } from "../../store";

type Log = {
  user: ChatChoices[];
  bot: ChatCompletion.Choice[];
};

interface InitialState {
  log: Log;
  requestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  questionAsked: boolean;
  isLoading: boolean;
  history: ChatMessage[];
  botIndex: number | null;
  creditUsed: number;
  totalCredit: number;
}

export const openAiRequest = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
  maxRetries: 3,
});

export const askBot = createAsyncThunk(
  "askingBot",
  async (userContent: string | null, { getState }) => {
    const {
      chat: { history },
    } = getState() as RootState;

    const response = await openAiRequest.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...history, { content: userContent, role: "user" }],
      max_tokens: 10,
    });

    return response;
  }
);

const initialState: InitialState = {
  log: {
    user: [],
    bot: [],
  },
  requestStatus: "idle",
  questionAsked: false,
  isLoading: false,
  history: [],
  botIndex: null,

  creditUsed: 0,
  totalCredit: 1000,
};

export const fetchChatLog = createAsyncThunk("chat/fetchChatLog", async () => {
  const docRef = doc(db, "chat", auth.currentUser!.uid);

  return (await getDoc(docRef)).data() as ChatLog[];
});

export const updateUserLog = createAsyncThunk(
  "chat/updateUserLog",
  async (log: ChatLog) => {
    const docRef = doc(db, "chat", auth.currentUser!.uid);

    return await updateDoc(docRef, {
      user: [...[], log],
    });
  }
);

export const updateBotLog = createAsyncThunk(
  "chat/updateBotLog",
  async (log: ChatLog) => {
    const docRef = doc(db, "chat", auth.currentUser!.uid);

    return await updateDoc(docRef, {
      bot: [...[], log],
    });
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserQuestion(state, action: PayloadAction<ChatMessage>) {
      // create a new user Obj.
      const newUserObj: ChatChoices = {
        finishReason: "stop",
        index: state.log.user.length,
        message: {
          role: "user",
          content: action.payload.content,
        },
      };

      //saving user question to the history
      state.history = [...state.history, newUserObj.message];

      //saving user question to the log
      state.log.user = [...state.log.user, newUserObj];

      //saving user output to localStorage
      localStorage.setItem("chat", JSON.stringify(state.history));
      localStorage.setItem("credit", JSON.stringify(state.totalCredit));
    },

    resetChatHistory(state) {
      return { ...state, history: [] };
    },

    addOldHistory(state, action: PayloadAction<ChatMessage[]>) {
      // Replace the current chat history with the provided old history
      state.history = action.payload;
    },

    addOldCreditRecord(state, action: PayloadAction<number>) {
      state.totalCredit = action.payload;
    },
  },
  //get user log from db
  extraReducers(builder) {
    builder
      .addCase(fetchChatLog.pending, (state) => {
        state.requestStatus = "pending";
      })

      .addCase(fetchChatLog.fulfilled, (state, action) => {
        state.requestStatus = "fulfilled";
        // state.log = action.payload; // Here, you can directly access action.payload
      })

      .addCase(fetchChatLog.rejected, (state) => {
        state.requestStatus = "rejected";
      });

    builder.addCase(askBot.pending, (state) => {
      state.questionAsked = true;
      state.isLoading = true;
    });
    builder
      .addCase(askBot.fulfilled, (state, action) => {
        const { choices, usage } = action.payload;

        const newBotIndex = (state.botIndex ?? -1) + 1;

        state.isLoading = false;
        state.questionAsked = false;
        state.creditUsed += usage?.total_tokens || 0;
        state.totalCredit = Math.max(
          0,
          state.totalCredit - (usage?.total_tokens || 0)
        );

        state.log.bot = [
          ...state.log.bot,
          {
            finish_reason: choices[0].finish_reason,
            index: newBotIndex,
            message: choices[0].message,
          },
        ];

        state.history = [...state.history, choices[0].message];
        state.botIndex = newBotIndex;

        localStorage.setItem("chat", JSON.stringify(state.history));
        localStorage.setItem("credit", JSON.stringify(state.totalCredit));
      })
      .addCase(askBot.rejected, (state) => {
        state.isLoading = false;
        state.questionAsked = false;
      });
  },
});

export const {
  addUserQuestion,
  resetChatHistory,
  addOldHistory,
  addOldCreditRecord,
} = chatSlice.actions;

export default chatSlice.reducer;
