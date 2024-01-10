import ChatLog from "./ChatLog";
import ChatForm from "./ChatForm";

const ChatWindow = () => {
  const gridColClassName = "p-0";

  return (
    <div className='d-flex flex-column flex-grow-1 position-relative justify-content-between'>
      <div style={{ maxHeight: "85vh" }} className='overflow-y-auto'>
        <ChatLog />
      </div>

      <div className=''>
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatWindow;
