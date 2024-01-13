import { FC, MouseEvent, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import { Card, Col } from "react-bootstrap";
import {
  addUserQuestion,
  askBot,
  updateUserLog,
} from "../../../redux/features/userData/userDataSlice";

interface Props {
  content: string;
}

const ChatCard: FC<Props> = ({ content }) => {
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const dispatch = useAppDispatch();

  const cardClassName = darkMode
    ? "h-100 btn btn-outline-light"
    : "h-100 btn btn-outline-dark";

  const handleCardClick = (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.innerText;

    dispatch(addUserQuestion({ content: text, role: "user" }));

    dispatch(askBot(text));
  };

  return (
    <Col xs={12} sm={12} md={6} className='mb-5'>
      <Card className={cardClassName} onClick={handleCardClick}>
        <Card.Body className='h-100 d-flex align-items-center justify-content-center'>
          {content}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ChatCard;
