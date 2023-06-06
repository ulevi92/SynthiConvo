import { FieldErrors } from "react-hook-form";
import { FormInputs } from "./types";
import FormErrorText from "./FormErrorText";

interface Props {
  errors: FieldErrors<FormInputs>;
  inputType: "email" | "password" | "confirmPassword";
}

export const FormErrors = ({ errors, inputType }: Props) => {
  //handle errors before submiting

  if (errors.email?.type === "pattern")
    return <FormErrorText message='email error: not a valid email' />;

  return (
    <>
      {errors.email?.type === "pattern" && (
        <FormErrorText message='Email error: not a valid email' />
      )}

      {errors.password?.type === "pattern" && (
        <FormErrorText message='Password error: password must contain at least 8 characters with: 1 uppercase, 1 lowercase, 1 symbol, and a number' />
      )}
    </>
  );
};
