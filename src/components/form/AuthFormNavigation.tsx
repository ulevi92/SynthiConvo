import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  ModalType,
  setModalType,
} from "../../redux/features/global/globalSlice";
import { clearAuthErrors } from "../../redux/features/authUser/authUserSlice";

type NavMessage =
  | "login to your account"
  | "don't have an account? sign up now!"
  | "forgot your password?";

interface AuthFormNavigationProps {
  linkType: ModalType;
}
const AuthFormNavigation = ({ linkType }: AuthFormNavigationProps) => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector((state) => state.global.modalType);

  const changeModalType = (changeTo: ModalType) => {
    dispatch(setModalType(changeTo));
    dispatch(clearAuthErrors());
  };

  const className =
    "add-pointer-cursor fw-bolder py-1 my-2 text-capitalize text-primary add-pointer-cursor";

  const renderLink = (message: NavMessage, changeTo: ModalType) => (
    <Form.Text className={className} onClick={() => changeModalType(changeTo)}>
      {message}
    </Form.Text>
  );

  const content = useMemo(() => {
    if (modalType === "login")
      return (
        <>
          <Col>
            {renderLink("don't have an account? sign up now!", "sign up")}
          </Col>

          <Col>{renderLink("forgot your password?", "passwordReminder")}</Col>
        </>
      );

    if (modalType === "sign up")
      return (
        <>
          <Col>{renderLink("login to your account", "login")}</Col>

          <Col>{renderLink("forgot your password?", "passwordReminder")}</Col>
        </>
      );

    if (modalType === "passwordReminder")
      return (
        <>
          <Col>
            {renderLink("don't have an account? sign up now!", "sign up")}
          </Col>

          <Col>{renderLink("login to your account", "login")}</Col>
        </>
      );

    return null;
  }, [modalType]);

  return (
    <Container className='p-0'>
      <Row className='flex-column'>{content}</Row>
    </Container>
  );
};

export default AuthFormNavigation;
