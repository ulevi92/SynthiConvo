import { Col, Container, Form, Row } from "react-bootstrap";
import ChatLog from "./ChatLog";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <Container fluid className='h-100'>
      <Row className='h-100 flex-grow-1 flex-column justify-content-between'>
        <Col className={gridColClassName}>
          <ChatLog />
        </Col>

        <Col className={gridColClassName}>
          <Form className='d-flex h-100 align-items-end'>
            <Form.Control />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWindow;
