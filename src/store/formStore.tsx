import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/form/formSlice";

const formStore = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default formStore;

//configure custom formStore types
export type FormRootState = ReturnType<typeof formStore.getState>;
export type FormDispatch = typeof formStore.dispatch;
