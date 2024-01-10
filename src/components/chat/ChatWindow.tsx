import ChatLog from "./ChatLog";
import ChatForm from "./ChatForm";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <div className='d-flex position-relative'>
      <div style={{ maxHeight: "85vh" }} className='overflow-y-auto'>
        <ChatLog />
      </div>

      <div className='align-self-end'>
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatWindow;
