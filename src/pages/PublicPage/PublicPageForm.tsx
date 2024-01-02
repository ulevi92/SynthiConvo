import { FC, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../../components/form/types";
import {
  clearAuthErrors,
  fetchEmailVerification,
  fetchResetPassword,
  fetchSignIn,
  fetchSignUp,
  setAuthLoading,
} from "../../redux/features/userData/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import {
  FormType,
  setFormType,
  setLoading,
} from "../../redux/features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import FormController from "../../components/form/FormController";
import { FormErrors } from "../../components/form/FormErrors";

type NavMessageType =
  | "login to your account"
  | "don't have an account? sign up now!"
  | "forgot your password?";

interface Props {
  mobile?: boolean;
}

const PublicPageForm: FC<Props> = ({ mobile }) => {
  const formType = useAppSelector((state) => state.global.formType);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formTextClassName = `add-pointer-cursor fw-bolder py-1 my-2 text-capitalize add-pointer-cursor ${
    mobile ? "text-primary" : "text-light"
  }`;

  const buttonVarient = mobile ? "outline-success" : "outline-light";

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

  const changeFormType = (changeTo: FormType) => {
    dispatch(setFormType(changeTo));
    dispatch(clearAuthErrors());
  };

  const createLink = (message: NavMessageType, changeTo: FormType) => (
    <Form.Text
      className={formTextClassName}
      onClick={() => changeFormType(changeTo)}
    >
      {message}
    </Form.Text>
  );

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
    [dispatch]
  );

  const RenderLinks = () => {
    switch (formType) {
      case "sign up":
        return (
          <>
            <FormController control={control} name='email' />

            <div>
              <FormErrors errors={errors} inputType='email' />
            </div>

            <FormController control={control} name='password' />

            <div>
              <FormErrors errors={errors} inputType='password' mobile />
            </div>

            <FormController control={control} name='confirmPassword' />

            <div>
              <FormErrors errors={errors} inputType='confirmPassword' />
            </div>

            <div>{createLink("forgot your password?", "reminder")}</div>

            <div>{createLink("login to your account", "login")}</div>

            <Button
              className='w-100'
              variant={buttonVarient}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </>
        );

      case "reminder":
        return (
          <>
            <FormController control={control} name='email' />

            <div>
              <FormErrors errors={errors} inputType='email' />
            </div>

            <div>
              {createLink("don't have an account? sign up now!", "sign up")}
            </div>

            <div>{createLink("login to your account", "login")}</div>

            <Button
              className='w-100'
              variant={buttonVarient}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </>
        );

      default:
        return (
          <>
            <FormController control={control} name='email' />

            <div>
              <FormErrors errors={errors} inputType='email' />
            </div>

            <FormController control={control} name='password' />

            <div>
              <FormErrors errors={errors} inputType='password' />
            </div>

            <div>{createLink("forgot your password?", "reminder")}</div>

            <div>
              {createLink("don't have an account? sign up now!", "sign up")}
            </div>

            <Button
              className='w-100'
              variant={buttonVarient}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </>
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='w-100'>
      {RenderLinks()}
    </Form>
  );
};

export default PublicPageForm;
