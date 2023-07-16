// AuthForm.tsx
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";
import { Button, Form } from "react-bootstrap";

import FormErrorText from "./FormErrorText";
import { handleClose, onSubmit } from "./AuthForm.helper";
import { FormController } from "./FormController";
import { FormInputs } from "./types";
import { FormButton } from "./FormButton";
import { FormErrors } from "./FormErrors";
import { useMemo } from "react";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);
  const rejectedMessage = useAppSelector((state) => state.auth.errorMessage);
  // const isFormRejected = useAppSelector((state) => state.auth.status);

  const renderRejectedMessage = () => {
    if (!!rejectedMessage) {
      const userAlreadySignedUp = rejectedMessage.match("email-already-in-use");
      const wrongPassword = rejectedMessage.match("wrong-password");
      const userNotFound = rejectedMessage.match("user-not-found");
      const networkRequestFailed = rejectedMessage.match(
        "network-request-failed"
      );

      if (userAlreadySignedUp) {
        return <FormErrorText message='your email is already exists' />;
      }

      if (wrongPassword || userNotFound) {
        return <FormErrorText message='wrong input data' />;
      }

      if (networkRequestFailed) {
        return <FormErrorText message='check your internet connection' />;
      }
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* email */}
      <FormController name='email' control={control} />

      {/* password */}
      {modalType === "login" && (
        <FormController name='password' control={control} />
      )}

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

      <br />

      {/* exit button */}
      <FormButton btnTask='close' handleButton={handleClose} />

      {/* submit button */}
      <FormButton btnTask='submit' handleButton={handleSubmit(onSubmit)} />

      <br />
      {renderRejectedMessage()}
    </Form>
  );
};

export default AuthForm;
