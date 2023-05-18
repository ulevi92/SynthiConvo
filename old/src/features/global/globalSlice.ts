import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./globalSlice.helper";
import { SetModalTypePayload } from "./types";

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },

    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },

    setModalType(state, action: PayloadAction<SetModalTypePayload>) {
      state.modalType = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setDarkMode, setModalType, setShowModal, setLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
