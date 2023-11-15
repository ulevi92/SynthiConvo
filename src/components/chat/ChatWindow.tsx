import { Col, Container, Form, Row } from "react-bootstrap";
import ChatLog from "./ChatLog";
import ChatForm from "./ChatForm";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <div className='h-100 overflow-hidden'>
      <Container className='h-75'>
        <Row className='h-100 flex-grow-1 flex-column justify-content-between overflow-auto'>
          <Col className={gridColClassName}>
            <ChatLog />
          </Col>
        </Row>
      </Container>

      <ChatForm />
    </div>
  );
};

export default ChatWindow;
