import { Col, Container, Form, Row } from "react-bootstrap";
import ChatLog from "./ChatLog";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <Container className='h-75 px-5'>
      <Row className='h-100 flex-grow-1 flex-column justify-content-between overflow-auto'>
        <Col className={gridColClassName}>
          <ChatLog />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWindow;
