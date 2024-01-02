import { FieldErrors } from "react-hook-form";
import { FormInputs } from "./types";
import FormErrorText from "./FormErrorText";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  errors: FieldErrors<FormInputs>;
  inputType: "email" | "password" | "confirmPassword";
  passwordMatches?: boolean;
  mobile?: boolean;
}

export const FormErrors = ({
  errors,
  inputType,
  passwordMatches,
  mobile,
}: Props) => {
  const formType = useAppSelector((state) => state.global.formType);

  return (
    <>
      {/* handle errors before submitting the form */}

      {inputType === "email" && errors.email?.type === "pattern" && (
        <FormErrorText message='Email error: not a valid email' />
      )}

      {formType === "sign up" &&
        inputType === "password" &&
        errors.password?.type === "pattern" && (
          <FormErrorText
            color={mobile ? "danger" : "warning"}
            message='Invalid password. It should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one of the following symbols: -+_!@#$%^&*.,?'
          />
        )}

      {formType === "sign up" &&
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
