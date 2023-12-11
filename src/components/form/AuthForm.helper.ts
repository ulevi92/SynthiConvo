import store from "../../redux/store";

import { clearAuthErrors } from "../../redux/features/user/userSlice";
import { clearModal } from "../../redux/features/global/globalSlice";
const dispatch = store.dispatch;
const modalType = store.getState().global.modalType;

export const handleClose = () => {
  dispatch(clearModal());
  dispatch(clearAuthErrors());
};

//validate email
export const emailValidation = /^(?!.*[\s@,]$)[^\s@]+@[^\s@]+\.[^\s@]+$/i;

//validate password, at least 8 chars, 1 upper, 1 lower, 1 number, 1 symbol
export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?])[A-Za-z\d\-+_!@#$%^&*.,?]{8,}$/;
