import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "about" | "clear conversation" | "conversation" | null;

export type FormType = "login" | "sign up" | "reminder";

type InitialState = {
  darkMode: boolean;
  showModal: boolean;
  modalType: ModalType;
  loading: boolean;
  formType: FormType;
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
  formType: "login",
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

    setFormType(state, action: PayloadAction<FormType>) {
      state.formType = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setModalType,
  setShowModal,
  setLoading,
  closeModal,
  setFormType,
} = globalSlice.actions;
export default globalSlice.reducer;
