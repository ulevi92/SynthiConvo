type ModalType = "login" | "sign up" | null;

export type InitialState = {
  darkMode: boolean;
  showModal: boolean;
  modalType: ModalType;
  loading: boolean;
};

export type SetModalTypePayload = ModalType;
