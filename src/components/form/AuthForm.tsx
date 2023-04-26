import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { Button, Form, FormControl } from "react-bootstrap";

import { InputType } from "../../features/auth/authSlice.helper";
import FormText from "./FormText";
import { setModalType, setShowModal } from "../../features/global/globalSlice";
import { useCallback, useMemo } from "react";
import {
  FormInputs,
  emailValidation,
  handleClose,
  onSubmit,
  passwordValidation,
} from "./AuthForm.helper";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);
  const btnName = modalType === "login" ? modalType : modalType;

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // handle errors
  const handleErrors = useMemo(
    () => (type: "email" | "password" | "confirmPassword") => {
      switch (type) {
        case "email":
          if (errors.email?.type === "required")
            return <FormText color='danger' message='please enter email' />;

          if (errors.email?.type === "pattern")
            return (
              <FormText color='danger' message='please enter a valid email' />
            );
          break;

        case "password":
          if (errors.password?.type === "required")
            return <FormText color='danger' message='please enter password' />;

          if (errors.password?.types?.pattern === true)
            return (
              <FormText
                color='danger'
                message='password must contain at least 8 characters, 1 uppercase, 1 loswercase, 1 number and 1 symbol'
              />
            );
          break;

        case "confirmPassword":
          if (errors.confirmPassword?.type === "required")
            return (
              <FormText
                color='danger'
                message='you must confirm your password'
              />
            );
          break;

        default:
          return null;
      }
    },
    [errors]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <Controller
        name='email'
        control={control}
        rules={{
          required: true,
          pattern: emailValidation,
        }}
        render={({ field }) => (
          <Form.Group>
            <Form.Label>email</Form.Label>

            <Form.Control type='email' {...field} />

            {handleErrors("email")}
          </Form.Group>
        )}
      />

      {/* password */}
      <Controller
        name='password'
        control={control}
        rules={
          modalType === "login"
            ? { required: true }
            : {
                required: true,
                pattern: passwordValidation,
                minLength: 8,
              }
        }
        render={({ field }) => (
          <Form.Group>
            <Form.Label>password</Form.Label>

            <Form.Control type='password' {...field} />

            {handleErrors("password")}
          </Form.Group>
        )}
      />

      {/* confirm password */}
      {modalType === "sign up" && (
        <Controller
          name='confirmPassword'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Group>
              <Form.Label>confirm password</Form.Label>
              <Form.Control type='password' {...field} />
            </Form.Group>
          )}
        />
      )}

      {/* exit button */}
      <Button
        variant='outline-secondary'
        className='text-uppercase mt-4'
        onClick={handleClose}
      >
        close
      </Button>

      {/* submit button */}
      <Button
        className='text-uppercase mx-2 mt-4'
        variant='success'
        type='submit'
        onClick={handleSubmit(onSubmit)}
      >
        {btnName}
      </Button>
    </Form>
  );
};

export default AuthForm;
