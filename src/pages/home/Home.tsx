import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/auth/authSlice";
import NotVerifiedError from "./NotVerifiedError";

const Home = () => {
  const dispatch = useAppDispatch();
  const notVerified = useAppSelector((state) => state.auth.userEmailVerified);

  if (!notVerified) return <NotVerifiedError />;

  const gridColClassName = "p-0";

  return (
    <Container fluid className='h-100'>
      <Row className='h-100 flex-grow-1 flex-column justify-content-between'>
        <Col className={gridColClassName}>chatbot log</Col>

        <Col className={gridColClassName}>
          <Form className='d-flex h-100 align-items-end'>
            <Form.Control />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
