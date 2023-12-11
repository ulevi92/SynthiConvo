import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
