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
import { useCallback, useMemo } from "react";
import {
  fetchResetPassword,
  fetchSignIn,
  fetchSignUp,
} from "../../redux/features/auth/authSlice";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);
  const rejectedMessage = useAppSelector((state) => state.auth.errorMessage);

  // const isFormRejected = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  const renderRejectedMessage = () => {
    if (!!rejectedMessage) {
      const userAlreadySignedUp = rejectedMessage.match("email-already-in-use");
      const wrongPassword = rejectedMessage.match("wrong-password");
      const userNotFound = rejectedMessage.match("user-not-found");
      const networkRequestFailed = rejectedMessage.match(
        "network-request-failed"
      );
      const tooManyRequests = rejectedMessage.match("too-many-requests");

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

  const onSubmit: SubmitHandler<FormInputs> = ({ email, password }) => {
    const credentials = { email, password };

    modalType === "login" && dispatch(fetchSignIn(credentials));
    modalType === "sign up" && dispatch(fetchSignUp(credentials));
    modalType === "passwordReminder" && dispatch(fetchResetPassword(email));
  };

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
      <br />

      {/* exit button */}
      <FormButton btnTask='close' handleButton={handleClose} />

      {/* submit button */}
      <FormButton btnTask='submit' handleButton={handleSubmit(onSubmit)} />
    </Form>
  );
};

export default AuthForm;
