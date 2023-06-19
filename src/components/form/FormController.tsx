import { Controller } from "react-hook-form";
import { emailValidation, passwordValidation } from "./AuthForm.helper";
import { Form } from "react-bootstrap";

import type { Control } from "react-hook-form";
import type { FormInputs } from "./types";

import store from "../../store/store";
import { useAppSelector } from "../../store/reduxHooks";
import { useMemo } from "react";

interface Props {
  name: "email" | "password" | "confirmPassword";
  control: Control<FormInputs, any>;
  password?: string;
}

export const FormController = ({ name, control, password }: Props) => {
  const modalType = useAppSelector((state) => state.global.modalType);

  const pattern =
    name === "email"
      ? emailValidation
      : name === "password" && modalType === "sign up"
      ? passwordValidation
      : undefined;

  const inputType = name === "email" ? "email" : "password";

  const formLabel = name === "confirmPassword" ? "confirm password" : name;

  const context = useMemo(
    () => (
      <Controller
        name={name}
        control={control}
        rules={
          name === "confirmPassword"
            ? {
                validate: (value, formInput) => {
                  return value === formInput.password;
                },
              }
            : { required: true, pattern: pattern }
        }
        render={({ field }) => (
          <Form.Group>
            <Form.Label className='text-capitalize'>{formLabel}</Form.Label>
            <Form.Control type={inputType} {...field} />
          </Form.Group>
        )}
      />
    ),
    []
  );

  return context;
};
