import {
  clearModal,
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";
import { SubmitHandler } from "react-hook-form";

import {
  clearAuthErrors,
  fetchResetPassword,
  fetchSignUp,
} from "../../redux/features/authUser/authUserSlice";

import { fetchSignIn } from "../../redux/features/authUser/authUserSlice";
import store from "../../redux/store";
import { FormInputs } from "./types";
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
