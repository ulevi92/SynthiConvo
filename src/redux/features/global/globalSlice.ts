import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "login"
  | "sign up"
  | "passwordReminder"
  | "about"
  | "account"
  | "clear conversation"
  | "conversation"
  | null;

type InitialState = {
  darkMode: boolean;
  showModal: boolean;
  modalType: ModalType;
  loading: boolean;
};

const initialState: InitialState = {
  darkMode: !localStorage.getItem("dark-mode")
    ? false
    : localStorage.getItem("dark-mode") === "dark"
    ? true
    : localStorage.getItem("dark-mode") === "light"
    ? false
    : false,

  showModal: false,
  modalType: null,
  loading: true,
};

type SetModalTypePayload = ModalType;

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
    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const {
  setDarkMode,
  setModalType,
  setShowModal,
  setLoading,
  closeModal,
} = globalSlice.actions;
export default globalSlice.reducer;
