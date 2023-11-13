import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";

const ChatLog = () => {
  const { log } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    const renderLog = log.user.flatMap(({ index, message }) => {
      const botAnswer = log.bot.find((botMsg) => botMsg.index === index);
      if (botAnswer) {
        // Render both user question and bot answer
        return [
          <LogScreen key={`user_${index}`}>{message.content}</LogScreen>,
          <LogScreen bot key={`bot_${index}`}>
            {botAnswer.message.content}
          </LogScreen>,
        ];
      }

      // Render only user question
      return <LogScreen key={`user_${index}`}>{message.content}</LogScreen>;
    });

    return <>{renderLog}</>;
  }, [log]);
};

export default memo(ChatLog);
