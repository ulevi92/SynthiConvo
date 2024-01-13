import ChatLog from "./ChatLog";
import ChatForm from "./ChatForm";
import { useAppSelector } from "../../redux/reduxHooks";

import ChatTasks from "./tasks/ChatTasks";
import { memo } from "react";

const ChatWindow = () => {
  const history = useAppSelector((state) => state.userData.chat.history);

  const showNewChatClassName =
    history.length === 0 ? "d-block h-100" : "d-none";
  const hideChatLog = history.length === 0 ? "d-none" : "overflow-y-auto";

  return (
    <div className='d-flex flex-column flex-grow-1 position-relative justify-content-between'>
      <div style={{ maxHeight: "85vh" }} className={`${hideChatLog}`}>
        <ChatLog />
      </div>

      <div className={showNewChatClassName}>
        <ChatTasks />
      </div>

      <div className=''>
        <ChatForm />
      </div>
    </div>
  );
};

export default memo(ChatWindow);
