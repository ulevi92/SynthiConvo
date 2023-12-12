import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import ChatFormController from "./ChatFormController";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import { ChatMessage } from "../../types/openAI";

import {
  addUserQuestion,
  askBot,
} from "../../redux/features/userData/userDataSlice";

export interface ChatValue {
  userInput: string;
}

const defaultUserInput: ChatValue = { userInput: "" };

const ChatForm = () => {
  const { control, handleSubmit, reset } = useForm<ChatValue>({
    defaultValues: defaultUserInput,
  });

  const dispatch = useAppDispatch();

  const darkMode = useAppSelector(({ global }) => global.darkMode);
  const questionAsked = useAppSelector(
    ({ userData }) => userData.chat.questionAsked
  );
  const totalCredit = useAppSelector(({ userData }) => userData.chat.credit);

  const onSubmit: SubmitHandler<ChatValue> = ({ userInput }) => {
    const questionToDispatch: ChatMessage = {
      content: userInput,
      role: "user",
    };

    dispatch(addUserQuestion(questionToDispatch));
    dispatch(askBot(userInput));
    reset();
  };

  return (
    <Container className='h-25  d-flex flex-column'>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className='d-flex flex-grow-1'
          >
            <ChatFormController control={control} />

            <Button
              onClick={handleSubmit(onSubmit)}
              variant={darkMode ? "outline-light" : "outline-dark"}
              disabled={questionAsked || totalCredit === 0}
            >
              {">"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatForm;
