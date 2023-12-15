import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import ChatFormController from "./ChatFormController";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import { ChatMessage } from "../../types/openAI";

import {
  addUserQuestion,
  askBot,
} from "../../redux/features/userData/userDataSlice";
import { ChatCompletionMessageParam } from "openai/resources";

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
    const questionToDispatch: ChatCompletionMessageParam = {
      content: userInput,
      role: "user",
    };

    dispatch(addUserQuestion(questionToDispatch));
    dispatch(askBot(userInput));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='px-5 my-5'>
      <ChatFormController control={control} />

      {/* <Button
              onClick={handleSubmit(onSubmit)}
              variant={darkMode ? "outline-light" : "outline-dark"}
              disabled={questionAsked || totalCredit === 0}
            >
              {">"}
            </Button> */}
    </Form>
  );
};

export default ChatForm;
