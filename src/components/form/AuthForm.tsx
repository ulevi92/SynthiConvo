// AuthForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Form } from "react-bootstrap";

import FormErrorText from "./FormErrorText";
import { handleClose } from "./AuthForm.helper";
import { FormController } from "./FormController";
import { FormInputs } from "./types";
import { FormButton } from "./FormButton";
import { FormErrors } from "./FormErrors";
import {
  ModalType,
  setModalType,
} from "../../redux/features/global/globalSlice";
import {
  fetchResetPassword,
  fetchSignIn,
  fetchSignUp,
} from "../../redux/features/auth/authSlice";
import { useCallback, useLayoutEffect } from "react";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);
  const { errorMessage, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");

  const passwordMatches = watchedConfirmPassword === watchedPassword;

  const renderRejectedMessage = () => {
    if (!!errorMessage) {
      const userAlreadySignedUp = errorMessage.match("email-already-in-use");
      const wrongPassword = errorMessage.match("wrong-password");
      const userNotFound = errorMessage.match("user-not-found");
      const networkRequestFailed = errorMessage.match("network-request-failed");
      const tooManyRequests = errorMessage.match("too-many-requests");

      if (userAlreadySignedUp)
        return <FormErrorText message='your email is already exists' />;

      if (wrongPassword || userNotFound)
        return <FormErrorText message='wrong input data' />;

      if (networkRequestFailed)
        return <FormErrorText message='check your internet connection' />;

      if (tooManyRequests)
        return (
          <FormErrorText message='too many requests, please try again later' />
        );
    }

    return <></>;
  };

  const renderFormClientHelper = () => {
    if (modalType === "login")
      return (
        <>
          {status === "error" && <br />}
          <FormErrorText
            color='primary'
            modalType={"sign up"}
            className='add-pointer-cursor fw-bolder'
            message="don't have an account? sign up now"
          />

          <br />
          <FormErrorText
            color='primary'
            modalType={"passwordReminder"}
            className='add-pointer-cursor fw-bolder'
            message='forgot your password?'
          />
        </>
      );

    if (modalType === "sign up")
      return (
        <>
          {status === "error" && <br />}
          <FormErrorText
            color='primary'
            modalType={"login"}
            className='add-pointer-cursor fw-bolder'
            message='login to your account'
          />

          <br />
          <FormErrorText
            color='primary'
            modalType={"passwordReminder"}
            className='add-pointer-cursor fw-bolder'
            message='forgot your password?'
          />
        </>
      );

    return (
      <>
        {status === "error" && <br />}
        <FormErrorText
          color='primary'
          modalType={"sign up"}
          className='add-pointer-cursor fw-bolder'
          message="don't have an account? sign up now"
        />
        <br />
        <FormErrorText
          color='primary'
          modalType={"login"}
          className='add-pointer-cursor fw-bolder'
          message='login to your account?'
        />
      </>
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    ({ email, password }) => {
      const credentials = { email, password };

      if (modalType === "passwordReminder") {
        dispatch(fetchResetPassword(email));
        return;
      }

      if (modalType === "sign up") {
        dispatch(fetchSignUp(credentials));
        return;
      }

      if (modalType === "login") {
        dispatch(fetchSignIn(credentials));
        return;
      }

      return;
    },
    [modalType]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <FormController name='email' control={control} />

      {/* password */}
      {modalType === "login" || modalType === "sign up" ? (
        <FormController name='password' control={control} />
      ) : null}

      {/* confirm password */}
      {modalType === "sign up" && (
        <FormController
          name='confirmPassword'
          control={control}
          password={watchedPassword} // Pass the 'password' value to the FormController
        />
      )}

      <FormErrors errors={errors} inputType='email' />
      <FormErrors errors={errors} inputType='password' />
      <FormErrors
        errors={errors}
        inputType='confirmPassword'
        passwordMatches={passwordMatches}
      />

      {renderRejectedMessage()}

      {renderFormClientHelper()}
      <br />

      {/* exit button */}
      <FormButton btnTask='close' handleButton={handleClose} />

      {/* submit button */}
      <FormButton btnTask='submit' handleButton={handleSubmit(onSubmit)} />
    </Form>
  );
};

export default AuthForm;
