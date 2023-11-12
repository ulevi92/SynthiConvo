import { PropsWithChildren, memo, useMemo, useState } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import { Card } from "react-bootstrap";

interface Props extends PropsWithChildren {
  bot?: boolean;
}

const LogScreen = ({ children, bot }: Props) => {
  const { darkMode } = useAppSelector((state) => state.global);
  const { displayName, userId, email } = useAppSelector((state) => ({
    displayName: state.authUser.user.displayName,
    userId: state.authUser.user.userId,
    email: state.authUser.user.email,
  }));

  return useMemo(() => {
    const defaultDisplayName = !bot
      ? displayName || `user-${userId!.slice(0, 5)}`
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
        style={{ borderRadius: 0 }}
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
