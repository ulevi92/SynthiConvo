import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import globalReducer from "../features/global/globalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
