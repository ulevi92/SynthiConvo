import { Button, Container, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import ChatController from "./ChatController";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { addUserQuestion, askBot } from "../../redux/features/chat/chatSlice";
import { ChatMessage } from "../../types/openAI";

export interface ChatValue {
  userInput: string;
}

const defaultUserInput: ChatValue = { userInput: "" };

const ChatSubmitForm = () => {
  const { control, handleSubmit, reset } = useForm<ChatValue>({
    defaultValues: defaultUserInput,
  });

  const dispatch = useAppDispatch();
  const { log, questionAsked, history } = useAppSelector((state) => state.chat);
  const darkMode = useAppSelector((state) => state.global.darkMode);

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
    <Container className='h-25  d-flex flex-row align-items-end'>
      <Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-grow-1'>
        <ChatController control={control} />

        <Button
          onClick={handleSubmit(onSubmit)}
          variant={darkMode ? "outline-light" : "outline-dark"}
          disabled={questionAsked}
        >
          {">"}
        </Button>
      </Form>
    </Container>
  );
};

export default ChatSubmitForm;
