import { PropsWithChildren, memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import { Card } from "react-bootstrap";

interface Props extends PropsWithChildren {
  bot?: boolean;
  endOfMessageRef: React.RefObject<HTMLDivElement> | null;
}

const LogScreen = ({ children, bot, endOfMessageRef }: Props) => {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const displayName = useAppSelector(
    ({ userData }) => userData.userProfile.displayName
  );
  const userId = useAppSelector(({ userData }) => userData.userProfile.userId);
  const email = useAppSelector(({ userData }) => userData.userProfile.email);

  return useMemo(() => {
    const defaultDisplayName = !bot
      ? displayName || `user-${userId!.slice(0, 6)}`
      : "AI bot";

    const cardClassName =
      !darkMode && !bot
        ? "chat-user-light"
        : darkMode && !bot
        ? "chat-user-dark"
        : !darkMode && bot
        ? "chat-bot-light"
        : "chat-bot-dark";

    return (
      <Card
        className={`${cardClassName} mt-2`}
        text='white'
        ref={endOfMessageRef}
      >
        <Card.Header className='d-flex flex-grow-1'>
          <div className='chat-image'>{!bot ? email?.slice(0, 1) : "Bot"}</div>

          <Card.Title className='text-capitalize m-0 d-flex align-self-center'>
            {defaultDisplayName}
          </Card.Title>
        </Card.Header>

        <Card.Body>{children}</Card.Body>
      </Card>
    );
  }, [bot, displayName, userId, darkMode]);
};

export default memo(LogScreen);
