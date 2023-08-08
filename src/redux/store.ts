import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./features/authUser/authUserSlice";
import globalReducer from "./features/global/globalSlice";
import chatReducer from "./features/chat/chatSlice";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    global: globalReducer,
    chat: chatReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
