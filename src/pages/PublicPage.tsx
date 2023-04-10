import { Button, Col, Container, Row } from "react-bootstrap";
import store from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import {} from "../features/global/globalSlice";

const PublicPage = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  return (
    <>
      <Container className='d-flex flex-grow-1 flex-column'>
        <Row className='flex-grow-1'>
          <Col>login</Col>
          <Col>signup</Col>
        </Row>
      </Container>
    </>
  );
};

export default PublicPage;
