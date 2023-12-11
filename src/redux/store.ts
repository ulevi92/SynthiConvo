import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./features/authUser/authUserSlice";
import globalReducer from "./features/global/globalSlice";
import chatReducer from "./features/chat/chatSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    global: globalReducer,
    chat: chatReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
