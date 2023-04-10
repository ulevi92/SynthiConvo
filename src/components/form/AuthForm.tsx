import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { Form } from "react-bootstrap";

import { InputType } from "../../features/auth/authSlice.helper";
import FormText from "./FormText";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);

  const inputs = useAppSelector((state) => state.auth.input);

  const dispatch = useAppDispatch();

  const handleErrors = () => {
    if (errors.email) {
      return errors.email.type === "pattern" ? (
        <FormText color='danger' message='please enter valid email' />
      ) : errors.email.type === "required" ? (
        <FormText color='danger' message='please enter email' />
      ) : undefined;
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>email address</Form.Label>

        <Form.Control
          type='email'
          placeholder='enter email'
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />

        {errors.email?.type === "required" && (
          <Form.Text className='text-capitalize text-danger'>
            email required
          </Form.Text>
        )}

        {errors.email?.types && handleErrors()}
      </Form.Group>
    </Form>
  );
};

export default AuthForm;
