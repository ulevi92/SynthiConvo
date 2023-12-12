import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import userReducer from "./features/userData/userDataSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    userData: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
