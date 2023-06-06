import { useDispatch, useStore } from "react-redux";
import { setModalType, setShowModal } from "../../features/global/globalSlice";
import { SubmitHandler, useFormState } from "react-hook-form";
import FormErrorText from "./FormErrorText";
import { useMemo } from "react";
import { fetchSignUp } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { fetchSignIn } from "../../features/auth/authSlice";
import store from "../../store/store";
import { FormInputs } from "./types";

export const handleClose = () => {
  const dispatch = store.dispatch;

  dispatch(setShowModal(false));
  dispatch(setModalType(null));
};

export const onSubmit: SubmitHandler<FormInputs> = async ({
  email,
  password,
  confirmPassword,
}) => {
  const state = store.getState();

  const dispatch = store.dispatch;

  const emailAndPassword = {
    email,
    password,
  };

  //handle sign up and sign up errors
  if (state.global.modalType === "sign up") {
    if (confirmPassword !== password) {
      //handle password not match error
    }

    dispatch(fetchSignUp(emailAndPassword));
    dispatch(setShowModal(false));
  }

  //handle login and login errors
  dispatch(fetchSignIn(emailAndPassword));
  dispatch(setShowModal(false));
};

//validate email
export const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//validate password, at least 8 chars, 1 upper, 1 lower, 1 number, 1 symbol
export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?])[A-Za-z\d\-+_!@#$%^&*.,?]{8,}$/;
