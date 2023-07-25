import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LogObject = { msg: string; id: number };

type Log = {
  user: LogObject[];
  bot: LogObject[];
};

interface InitialState {
  log: Log;

  userQuestion: string | null;
  botAnswer: string | null;
  questionAsked: boolean;
}

const initialState: InitialState = {
  log: {
    user: [],
    bot: [],
  },

  userQuestion: null,
  botAnswer: null,
  questionAsked: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addBotAnswer(state, action: PayloadAction<LogObject>) {
      const newBotMsg: LogObject = {
        msg: action.payload.msg,
        id: action.payload.id,
      };

      state.log.bot = [...state.log.bot, newBotMsg];
    },

    addUserQuestion(state, action: PayloadAction<LogObject>) {
      const newUserMsg: LogObject = {
        msg: action.payload.msg,
        id: action.payload.id,
      };

      state.log.user = [...state.log.user, newUserMsg];
      state.userQuestion = action.payload.msg;
      state.questionAsked = true;
    },
  },
  // extraReducers: {},
});

export const { addBotAnswer, addUserQuestion } = chatSlice.actions;

export default chatSlice.reducer;
