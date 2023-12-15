import { memo, useLayoutEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import LogScreen from "./LogScreen";
import { updateUserCreditAndHistory } from "../../redux/features/userData/userDataSlice";

const ChatLog = () => {
  const endOfMessageRef = useRef<HTMLDivElement>(null);

  const history = useAppSelector((state) => state.userData.chat.history);
  const credit = useAppSelector((state) => state.userData.chat.credit);
  const questionAsked = useAppSelector(
    (state) => state.userData.chat.questionAsked
  );
  const botAnswered = useAppSelector(
    (state) => state.userData.chat.botAnswered
  );

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (endOfMessageRef.current)
      endOfMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useLayoutEffect(() => {
    if (questionAsked)
      dispatch(updateUserCreditAndHistory({ credit, history }));

    if (botAnswered) dispatch(updateUserCreditAndHistory({ credit, history }));
  }, [questionAsked, botAnswered]);

  return useMemo(() => {
    return (
      <>
        {history.map(({ content, role }, index) => (
          <LogScreen
            bot={role === "assistant"}
            key={index}
            endOfMessageRef={
              index === history.length - 1 ? endOfMessageRef : null
            }
          >
            {content?.toString()}
          </LogScreen>
        ))}
      </>
    );
  }, [history]);
};

export default memo(ChatLog);
