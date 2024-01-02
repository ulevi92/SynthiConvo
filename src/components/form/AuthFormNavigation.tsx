import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormType, setFormType } from "../../redux/features/global/globalSlice";
import { clearAuthErrors } from "../../redux/features/userData/userDataSlice";

type NavMessageType =
  | "login to your account"
  | "don't have an account? sign up now!"
  | "forgot your password?";

const AuthFormNavigation = () => {
  const dispatch = useAppDispatch();
  const formType = useAppSelector((state) => state.global.formType);

  const changeFormType = (changeTo: FormType) => {
    dispatch(setFormType(changeTo));
    dispatch(clearAuthErrors());
  };

  const className =
    "add-pointer-cursor fw-bolder py-1 my-2 text-capitalize text-primary add-pointer-cursor";

  const renderLink = (message: NavMessageType, changeTo: FormType) => (
    <Form.Text className={className} onClick={() => changeFormType(changeTo)}>
      {message}
    </Form.Text>
  );

  const content = useMemo(() => {
    if (formType === "login")
      return (
        <>
          <Col>
            {renderLink("don't have an account? sign up now!", "sign up")}
          </Col>

          <Col>{renderLink("forgot your password?", "reminder")}</Col>
        </>
      );

    if (formType === "sign up")
      return (
        <>
          <Col>{renderLink("login to your account", "login")}</Col>

          <Col>{renderLink("forgot your password?", "reminder")}</Col>
        </>
      );

    if (formType === "reminder")
      return (
        <>
          <Col>
            {renderLink("don't have an account? sign up now!", "sign up")}
          </Col>

          <Col>{renderLink("login to your account", "login")}</Col>
        </>
      );

    return null;
  }, [formType]);

  return (
    <Container className='p-0'>
      <Row className='flex-column'>{content}</Row>
    </Container>
  );
};

export default AuthFormNavigation;
