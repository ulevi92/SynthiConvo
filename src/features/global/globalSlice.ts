import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./globalSlice.helper";
import { SetModalTypePayload } from "./types";

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      state.darkMode = payload;
    },

    setShowModal(state, { payload }: PayloadAction<boolean>) {
      state.showModal = payload;
    },

    setModalType(state, { payload }: PayloadAction<SetModalTypePayload>) {
      state.modalType = payload;
    },
  },
});

export const { setDarkMode, setModalType, setShowModal } = globalSlice.actions;
export default globalSlice.reducer;
