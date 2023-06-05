import { Controller } from "react-hook-form";
import { emailValidation, passwordValidation } from "./AuthForm.helper";
import { Form } from "react-bootstrap";

import type { Control } from "react-hook-form";
import type { FormInputs } from "./types";
import { FormErrors } from "./FormErrors";
import store from "../../store/store";
import { useAppSelector } from "../../store/reduxHooks";

interface Props {
  name: "email" | "password" | "confirmPassword";
  control: Control<FormInputs, any>;
}

export const FormController = ({ name, control }: Props) => {
  const modalType = useAppSelector((state) => state.global.modalType);

  const pattern =
    name === "email"
      ? emailValidation
      : name === "password" && modalType === "sign up"
      ? passwordValidation
      : undefined;

  const inputType = name === "email" ? "email" : "password";

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, pattern: pattern }}
      render={({ field }) => (
        <Form.Group>
          <Form.Label>{name}</Form.Label>
          <Form.Control type={inputType} {...field} />

          <FormErrors />
        </Form.Group>
      )}
    />
  );
};
