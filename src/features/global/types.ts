type ModalType = "login" | "sign up" | null;

export type InitialState = {
  darkMode: boolean;
  showModal: boolean;
  modalType: ModalType;
};

export type SetModalTypePayload = ModalType;
