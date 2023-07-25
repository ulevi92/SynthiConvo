import { PropsWithChildren, memo, useMemo } from "react";
import { useAppSelector } from "../../redux/reduxHooks";
import { Card, Figure, Image } from "react-bootstrap";

interface Props extends PropsWithChildren {
  bot?: boolean;
}

const LogScreen = ({ children, bot }: Props) => {
  const { darkMode } = useAppSelector((state) => state.global);
  const { userDisplayName, userImg, userUid } = useAppSelector(
    (state) => state.auth
  );

  const img =
    "https://pixabay.com/get/g03f27d66d3e1299819bcf85f246c032850b3073578fdfec722184b25c79578a1f09f9a2502a66490a4ff4ffc5d485679_640.jpg";

  const botImage =
    "https://cdn.pixabay.com/photo/2018/02/01/20/48/woman-3124083_1280.jpg";

  return useMemo(() => {
    const defaultImage = !bot ? userImg || img : botImage;

    const defaultDisplayName = !bot
      ? userDisplayName || `user-${userUid.slice(0, 5)}`
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
          <Figure className='my-0 me-3 d-flex'>
            <Figure.Image
              src={defaultImage}
              width={30}
              roundedCircle
              alt='user image'
              className='m-0'
            />
          </Figure>

          <Card.Title className='text-capitalize m-0 d-flex align-self-center'>
            {defaultDisplayName}
          </Card.Title>
        </Card.Header>

        <Card.Body>{children}</Card.Body>
      </Card>
    );
  }, [bot, userDisplayName, userImg, userUid, darkMode]);
};

export default memo(LogScreen);
