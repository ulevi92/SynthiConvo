import { Col, Container, Row } from "react-bootstrap";
import ChatLog from "./ChatLog";
import ChatForm from "./ChatForm";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <div className='d-flex flex-column position-relative justify-content-between h-100'>
      <div style={{ maxHeight: "85vh" }} className='overflow-y-auto'>
        <ChatLog />
      </div>

      <div>
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatWindow;
