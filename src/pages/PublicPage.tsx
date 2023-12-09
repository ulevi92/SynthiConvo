import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import {
  setModalType,
  setShowModal,
} from "../redux/features/global/globalSlice";
import AppModal from "../components/modal/AppModal";

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
        <Row className='flex-grow-1 align-items-center flex-row'>
          <Col className='d-flex justify-content-end'>
            <Button onClick={handleOpenModal}>login</Button>
          </Col>
          <Col className='d-flex justify-content-start'>
            <Button onClick={handleOpenModal}>sign up</Button>
          </Col>
        </Row>
      </Container>

      <AppModal />
    </>
  );
};

export default PublicPage;
