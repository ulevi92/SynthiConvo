import { Controller } from "react-hook-form";
import { emailValidation, passwordValidation } from "./AuthForm.helper";
import { Form } from "react-bootstrap";

import type { Control } from "react-hook-form";
import type { FormInputs } from "./types";

import { useAppSelector } from "../../redux/reduxHooks";
import { memo, useMemo } from "react";

interface Props {
  name: "email" | "password" | "confirmPassword";
  control: Control<FormInputs, any>;
}

const FormController = ({ name, control }: Props) => {
  const formType = useAppSelector((state) => state.global.formType);

  const pattern =
    name === "email"
      ? emailValidation
      : name === "password" && formType === "sign up"
      ? passwordValidation
      : undefined;

  const inputType = name === "email" ? "email" : "password";

  const formLabel = name === "confirmPassword" ? "confirm password" : name;

  return useMemo(
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
    [name, control, pattern, inputType, formLabel]
  );
};

export default memo(FormController);
