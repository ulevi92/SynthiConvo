import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userLog: string[];
  botLog: string[];
  userQuestion: string | null;
  botAnswer: string | null;
  questionAsked: boolean;
}

const initialState: InitialState = {
  userLog: ["user1", "user2"],
  botLog: ["bot1", "bot2"],
  userQuestion: null,
  botAnswer: null,
  questionAsked: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addBotAnswer(state, action: PayloadAction<string>) {
      state.botLog = [...state.botLog, action.payload];
    },
    addUserQuestion(state, action: PayloadAction<string>) {
      state.userLog = [...state.userLog, action.payload];
    },
  },
  // extraReducers: {},
});

export const { addBotAnswer, addUserQuestion } = chatSlice.actions;

export default chatSlice.reducer;
