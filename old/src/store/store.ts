import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../ai-chat/features/auth/authSlice";
import globalReducer from "../../../ai-chat/features/global/globalSlice";
import userReducer from "../../../ai-chat/features/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
