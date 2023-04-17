import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { Button, Form } from "react-bootstrap";

import { InputType } from "../../features/auth/authSlice.helper";
import FormText from "./FormText";
import { setModalType, setShowModal } from "../../features/global/globalSlice";
import { useCallback } from "react";

const AuthForm = () => {
  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>();

  const handleErrors = useCallback(() => {
    if (errors.email && errors.email?.type === "required")
      return <FormText color='danger' message='please enter email' />;

    if (errors.email?.type === "pattern")
      return <FormText color='danger' message='please enter valid email' />;
  }, [errors]);

  const handleClose = () => {
    dispatch(setShowModal(false));
    dispatch(setModalType(null));
  };

  const btnName = modalType === "login" ? modalType : modalType;

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

        {handleErrors()}
      </Form.Group>

      <Button
        variant='outline-secondary'
        className='text-uppercase'
        onClick={handleClose}
      >
        close
      </Button>

      <Button className='text-uppercase' variant='success' type='submit'>
        {btnName}
      </Button>
    </Form>
  );
};

export default AuthForm;
