import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";

const ChatLog = () => {
  const { botLog, userLog } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    // Combine user and bot logs, interleaving user messages first
    const log = userLog.flatMap((userMsg, index) => [
      <div key={`user_${index}`}>{userMsg}</div>,
      <div key={`bot_${index}`}>{botLog[index]}</div>, // Assumes botLog has the same length as userLog
    ]);

    return <div>{log}</div>; // Wrap the array of JSX elements with a <div>
  }, [botLog, userLog]);
};

export default memo(ChatLog);
