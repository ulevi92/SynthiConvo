import {
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";
import { SubmitHandler } from "react-hook-form";

import { fetchSignUp } from "../../redux/features/auth/authSlice";

import { fetchSignIn } from "../../redux/features/auth/authSlice";
import store from "../../redux/store";
import { FormInputs } from "./types";

export const handleClose = () => {
  const dispatch = store.dispatch;

  dispatch(setShowModal(false));
  dispatch(setModalType(null));
};

export const onSubmit: SubmitHandler<FormInputs> = async ({
  email,
  password,
}) => {
  const state = store.getState();
  const dispatch = store.dispatch;

  const emailAndPassword = {
    email,
    password,
  };

  //handle sign up and sign up errors
  if (state.global.modalType === "sign up") {
    dispatch(fetchSignUp(emailAndPassword));
  }

  //handle login and login errors
  await dispatch(fetchSignIn(emailAndPassword));
};

//validate email
export const emailValidation = /^(?!.*[\s@,]$)[^\s@]+@[^\s@]+\.[^\s@]+$/i;

//validate password, at least 8 chars, 1 upper, 1 lower, 1 number, 1 symbol
export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?])[A-Za-z\d\-+_!@#$%^&*.,?]{8,}$/;
