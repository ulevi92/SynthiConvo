import { useDispatch } from "react-redux";
import { setModalType, setShowModal } from "../../features/global/globalSlice";
import { SubmitHandler, useFormState } from "react-hook-form";
import FormText from "./FormText";
import { useMemo } from "react";
import { fetchSignUp } from "../../features/auth/authSlice";
import { useAppSelector } from "../../store/reduxHooks";
import { fetchSignIn } from "../../features/auth/authSlice";

export interface FormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const dispatch = useDispatch();

const modalType = useAppSelector((state) => state.global.modalType);

export const handleClose = () => {
  dispatch(setShowModal(false));
  dispatch(setModalType(null));
};

export const onSubmit: SubmitHandler<FormInputs> = async (data) => {
  //handle passwords
  if (data.confirmPassword !== data.password) return;

  const emailAndPassword = {
    email: data.email,
    password: data.password,
  };

  // if (data.confirmPassword !== data.password) return;

  if (modalType === "login") {
    fetchSignIn(emailAndPassword);

    return;
  }

  if (modalType === "sign up") {
    fetchSignUp(emailAndPassword);

    return;
  }
};

//validate email
export const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//validate password, at least 8 chars, 1 upper, 1 lower, 1 number, 1 symbol
export const passwordValidation =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
