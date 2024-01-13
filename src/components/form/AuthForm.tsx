import { SubmitHandler, useForm } from "react-hook-form";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import FormController from "./FormController";
import { FormInputs } from "./types";
import { FormButton } from "./FormButton";
import { FormErrors } from "./FormErrors";
import RejectedErrors from "./RejectedErrors";
import { useCallback } from "react";
import { handleClose } from "./AuthForm.helper";
import AuthFormNavigation from "./AuthFormNavigation";
import { setLoading } from "../../redux/features/global/globalSlice";
import {
  fetchEmailVerification,
  fetchResetPassword,
  fetchSignIn,
  fetchSignUp,
  setAuth,
  setAuthLoading,
} from "../../redux/features/userData/userDataSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();

  const formType = useAppSelector((state) => state.global.formType);

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

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async ({ email, password }) => {
      dispatch(setAuthLoading(true));

      const credentials = { email, password };

      if (formType === "reminder") {
        await dispatch(fetchResetPassword(email));
        return;
      }

      if (formType === "sign up") {
        await dispatch(fetchSignUp(credentials));
        await dispatch(fetchEmailVerification());
        return;
      }

      if (formType === "login") {
        await dispatch(fetchSignIn(credentials));
        return;
      }

      dispatch(setAuthLoading(false));
      dispatch(setLoading(true));
      navigate("/");
      window.location.reload();

      // Add any additional logic or navigation as needed
    },
    [formType, dispatch]
  );

  return (
    <Container className='p-0'>
      <Row className='flex-column'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <FormController name='email' control={control} />

          <Col>
            <FormErrors errors={errors} inputType='email' />
          </Col>

          {/* password */}
          {(formType === "login" || formType === "sign up") && (
            <FormController name='password' control={control} />
          )}
          <Col>
            <FormErrors errors={errors} inputType='password' />
          </Col>

          {/* confirm password */}
          {formType === "sign up" && (
            <FormController name='confirmPassword' control={control} />
          )}

          <Col>
            <FormErrors
              errors={errors}
              inputType='confirmPassword'
              passwordMatches={passwordMatches}
            />
          </Col>

          <Col>
            <RejectedErrors />
          </Col>

          <AuthFormNavigation />

          {/* exit button */}
          <FormButton btnTask='close' handleButton={handleClose} />

          {/* submit button */}
          <FormButton btnTask='submit' handleButton={handleSubmit(onSubmit)} />
        </Form>
      </Row>
    </Container>
  );
};

export default AuthForm;
