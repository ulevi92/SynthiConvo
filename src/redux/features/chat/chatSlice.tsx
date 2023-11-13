import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { ChatChoices, ChatLog, ChatMessage } from "../../../types/openAI";

import OpenAI from "openai";
import { ChatCompletion } from "openai/resources";

type Log = {
  user: ChatChoices[];
  bot: ChatCompletion.Choice[];
};

interface InitialState {
  log: Log;
  requestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  userLastQuestion: string | null;
  questionAsked: boolean;
  isLoading: boolean;

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
  async (content: string | null) => {
    const response = await openAiRequest.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ content, role: "user" }],
    });

    const a = response.choices;

    return response;
  }
);

const initialState: InitialState = {
  log: {
    user: [],
    bot: [],
  },
  requestStatus: "idle",
  userLastQuestion: null,
  questionAsked: false,
  isLoading: false,

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
    addUserQuestion(state, action: PayloadAction<ChatChoices>) {
      //injecting user question to the state

      state.log.user = [...state.log.user, action.payload];
      state.userLastQuestion = action.payload.message.content;
      state.questionAsked = true;
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

    builder
      .addCase(askBot.pending, (state) => {
        state.questionAsked = true;
        state.isLoading = true;
      })
      .addCase(askBot.fulfilled, (state, action) => {
        const { choices, usage } = action.payload;

        state.isLoading = false;
        state.questionAsked = false;
        state.creditUsed = state.creditUsed + usage?.total_tokens!;
        state.totalCredit = state.totalCredit - usage?.total_tokens!;

        state.log.bot = [...state.log.bot, ...choices];
      })
      .addCase(askBot.rejected, (state) => {
        state.isLoading = false;
        state.questionAsked = false;
      });
  },
});

export const { addUserQuestion } = chatSlice.actions;

export default chatSlice.reducer;
