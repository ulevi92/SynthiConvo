import store from "../../redux/store";

import { clearAuthErrors } from "../../redux/features/userData/userDataSlice";
import { closeModal } from "../../redux/features/global/globalSlice";
const dispatch = store.dispatch;

export const handleClose = () => {
  dispatch(closeModal());
  dispatch(clearAuthErrors());
};

//validate email
export const emailValidation = /^(?!.*[\s@,]$)[^\s@]+@[^\s@]+\.[^\s@]+$/i;

//validate password, at least 8 chars, 1 upper, 1 lower, 1 number, 1 symbol
export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?])[A-Za-z\d\-+_!@#$%^&*.,?]{8,}$/;
