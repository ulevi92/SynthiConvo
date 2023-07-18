import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType = "login" | "sign up" | "passwordReminder" | null;

type InitialState = {
  darkMode: boolean;
  showModal: boolean;
  modalType: ModalType;
  loading: boolean;
};

const initialState: InitialState = {
  darkMode: false,
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
    clearModal() {
      return { ...initialState, loading: false };
    },
  },
});

export const {
  setDarkMode,
  setModalType,
  setShowModal,
  setLoading,
  clearModal,
} = globalSlice.actions;
export default globalSlice.reducer;
