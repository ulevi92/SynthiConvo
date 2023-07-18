import { FieldErrors } from "react-hook-form";
import { FormInputs } from "./types";
import FormErrorText from "./FormErrorText";
import { useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  errors: FieldErrors<FormInputs>;
  inputType: "email" | "password" | "confirmPassword";
  passwordMatches?: boolean;
}

export const FormErrors = ({ errors, inputType, passwordMatches }: Props) => {
  const modalType = useAppSelector((state) => state.global.modalType);

  return (
    <>
      {/* handle errors before submitting the form */}

      {inputType === "email" && errors.email?.type === "pattern" && (
        <FormErrorText message='Email error: not a valid email' />
      )}

      {modalType === "sign up" &&
        inputType === "password" &&
        errors.password?.type === "pattern" && (
          <FormErrorText
            color='warning'
            message='Invalid password. It should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one of the following symbols: -+_!@#$%^&*.,?'
          />
        )}

      {modalType === "sign up" &&
        inputType === "confirmPassword" &&
        errors.confirmPassword?.type === "validate" &&
        !passwordMatches && (
          <FormErrorText
            message={
              errors.confirmPassword.root?.message || "passwords does not match"
            }
          />
        )}
    </>
  );
};
