// AuthForm.tsx
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../store/reduxHooks";
import { Button, Form } from "react-bootstrap";

import FormErrorText from "./FormErrorText";
import { handleClose, onSubmit } from "./AuthForm.helper";
import { FormController } from "./FormController";
import { FormInputs } from "./types";
import { FormButton } from "./FormButton";
import { FormErrors } from "./FormErrors";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);

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
      <FormController name='password' control={control} />

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
    </Form>
  );
};

export default AuthForm;
