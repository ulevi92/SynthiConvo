import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";

const ChatLog = () => {
  const { log } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    const renderLog = log.user.flatMap(({ msg, id }) => {
      const botAnswer = log.bot.find((botMsg) => botMsg.id === id);
      if (botAnswer) {
        // Render both user question and bot answer
        return [
          <LogScreen key={`user_${id}`}>{msg}</LogScreen>,
          <LogScreen bot key={`bot_${id}`}>
            {botAnswer.msg}
          </LogScreen>,
        ];
      }

      // Render only user question
      return <LogScreen key={`user_${id}`}>{msg}</LogScreen>;
    });

    return <>{renderLog}</>;
  }, [log]);
};

export default memo(ChatLog);
