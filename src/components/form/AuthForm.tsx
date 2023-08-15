import { SubmitHandler, useForm } from "react-hook-form";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import FormController from "./FormController";
import { FormInputs } from "./types";
import { FormButton } from "./FormButton";
import { FormErrors } from "./FormErrors";
import {
  fetchResetPassword,
  fetchSignIn,
  fetchSignUp,
} from "../../redux/features/authUser/authUserSlice";
import RejectedErrors from "./RejectedErrors";
import { useCallback, useEffect } from "react";
import { handleClose } from "./AuthForm.helper";
import AuthFormNavigation from "./AuthFormNavigation";
import { setLoading } from "../../redux/features/global/globalSlice";

const AuthForm = () => {
  const { modalType } = useAppSelector((state) => ({
    modalType: state.global.modalType,
  }));

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
      const credentials = { email, password };

      if (modalType === "passwordReminder") {
        await dispatch(fetchResetPassword(email));
        return;
      }

      await dispatch(fetchSignIn(credentials));
      dispatch(setLoading(true));
    },
    [modalType, dispatch]
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
          {(modalType === "login" || modalType === "sign up") && (
            <FormController name='password' control={control} />
          )}
          <Col>
            <FormErrors errors={errors} inputType='password' />
          </Col>

          {/* confirm password */}
          {modalType === "sign up" && (
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

          <AuthFormNavigation linkType='login' />

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
