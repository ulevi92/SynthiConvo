import { FC, MouseEvent, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import { Button, Card, Col } from "react-bootstrap";
import {
  addUserQuestion,
  askBot,
} from "../../../redux/features/userData/userDataSlice";

interface Props {
  content: string;
  description: string;
}

const ChatCard: FC<Props> = ({ content, description }) => {
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const credit = useAppSelector((state) => state.userData.chat.credit);
  const dispatch = useAppDispatch();

  const handleCardClick = (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.innerText;

    dispatch(addUserQuestion({ content: text, role: "user" }));

    dispatch(askBot(text));
  };

  return (
    <Col xs={12} sm={12} md={6} className='mb-5'>
      <Button
        disabled={credit === 0}
        variant={darkMode ? "outline-light" : "outline-dark"}
        className='w-100 h-100'
        size='lg'
        onClick={handleCardClick}
      >
        <h4>{content}</h4>
        <p className='text-secondary'>{description}</p>
      </Button>
    </Col>
  );
};

export default ChatCard;
