import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";
import { ZoomIn } from "react-bootstrap-icons";

const ChatLog = () => {
  const { log, history } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    const renderHistoryLog = history.flatMap(({ content, role }) => {
      return [
        <LogScreen
          key={
            role === "user"
              ? `user_${log.user.length}`
              : `bot_${log.bot.length}`
          }
        >
          {role === "user" ? `${content}` : `${content}`}
        </LogScreen>,
      ];
    });

    return <>{renderHistoryLog}</>;
  }, [log, history]);
};

export default memo(ChatLog);
