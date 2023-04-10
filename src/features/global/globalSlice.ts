import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./globalSlice.helper";
import { SetModalTypePayload } from "./types";

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setDarkMode({ darkMode }, { payload }: PayloadAction<boolean>) {
      darkMode = payload;
    },

    setShowModal({ showModal }, { payload }: PayloadAction<boolean>) {
      showModal = payload;
    },

    setModalType(
      { modalType },
      { payload }: PayloadAction<SetModalTypePayload>
    ) {
      modalType = payload;
    },
  },
});

export const { setDarkMode, setModalType, setShowModal } = globalSlice.actions;
export default globalSlice.reducer;
