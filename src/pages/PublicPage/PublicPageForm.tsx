import { FC, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { FormType } from "./PublicPage.helper";
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
import { useAppDispatch } from "../../redux/reduxHooks";
import { setLoading } from "../../redux/features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import FormController from "../../components/form/FormController";
import { FormErrors } from "../../components/form/FormErrors";

type NavMessageType =
  | "login to your account"
  | "don't have an account? sign up now!"
  | "forgot your password?";

interface Props {
  formType: "login" | "sign up" | "reminder";
  setFormType: React.Dispatch<React.SetStateAction<FormType>>;
}

const formTextClassName =
  "add-pointer-cursor fw-bolder py-1 my-2 text-capitalize text-light add-pointer-cursor";

const PublicPageForm: FC<Props> = ({ formType, setFormType }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    setFormType(changeTo);
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
              <FormErrors errors={errors} inputType='password' />
            </div>

            <FormController control={control} name='confirmPassword' />

            <div>
              <FormErrors errors={errors} inputType='confirmPassword' />
            </div>

            <div>{createLink("forgot your password?", "reminder")}</div>

            <div>{createLink("login to your account", "login")}</div>

            <Button
              className='w-100'
              variant='outline-light'
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
              variant='outline-light'
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
              variant='outline-light'
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
