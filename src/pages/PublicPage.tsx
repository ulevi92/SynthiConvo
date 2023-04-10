import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { setModalType, setShowModal } from "../features/global/globalSlice";
import AuthModal from "../components/AuthModal";

const PublicPage = () => {
  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleOpenModal = (e: React.MouseEvent) => {
    const innerText = e.currentTarget.textContent;

    const modalType =
      innerText === "login"
        ? "login"
        : innerText === "sign up"
        ? "sign up"
        : null;

    console.log(modalType);

    dispatch(setShowModal(true));

    dispatch(setModalType(modalType));
  };

  return (
    <>
      <Container className='d-flex flex-grow-1 flex-column'>
        <Row className='flex-grow-1'>
          <Col>
            <Button onClick={handleOpenModal}>login</Button>
          </Col>
          <Col>
            <Button onClick={handleOpenModal}>sign up</Button>
          </Col>
        </Row>
      </Container>

      <AuthModal />
    </>
  );
};

export default PublicPage;
