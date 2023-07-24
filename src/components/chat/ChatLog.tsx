import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreem";

const ChatLog = () => {
  const { botLog, userLog } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    // Combine user and bot logs, interleaving user messages first
    const log = userLog.flatMap((userMsg, index) => [
      <LogScreen key={`user_${index}`}>{userMsg}</LogScreen>,
      <LogScreen bot key={`bot_${index}`}>
        {botLog[index]}
      </LogScreen>, // Assumes botLog has the same length as userLog
    ]);

    return <>{log}</>; // Wrap the array of JSX elements with a <div>
  }, [botLog, userLog]);
};

export default memo(ChatLog);
