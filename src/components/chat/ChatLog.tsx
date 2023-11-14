import { memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";

const ChatLog = () => {
  const { log, history } = useAppSelector((state) => state.chat);

  return useMemo(() => {
    return (
      <>
        {history.map(({ role, content }) => (
          <>
            <LogScreen
              bot={role === "assistant"}
              key={
                role === "user"
                  ? `user_${log.user.length}`
                  : `bot_${log.bot.length}`
              }
            >
              {content}
            </LogScreen>
          </>
        ))}
      </>
    );
  }, [log, history]);
};

export default memo(ChatLog);
