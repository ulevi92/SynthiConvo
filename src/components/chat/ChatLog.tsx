import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";

const ChatLog = () => {
  const { log, history } = useAppSelector((state) => state.user.chat);

  return useMemo(() => {
    return (
      <>
        {history.map(({ message: { content, role } }, index) => (
          <LogScreen bot={role === "assistant"} key={index}>
            {content}
          </LogScreen>
        ))}
      </>
    );
  }, [log, history]);
};

export default memo(ChatLog);
