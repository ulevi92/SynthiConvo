import { Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import ChatFormController from "./ChatFormController";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import {
  addUserQuestion,
  askBot,
} from "../../redux/features/userData/userDataSlice";
import { ChatCompletionMessageParam } from "openai/resources";
import Icon from "../Icon";
import { Loader } from "../loader/Loader";

export interface ChatValue {
  userInput: string;
}

const defaultUserInput: ChatValue = { userInput: "" };

const ChatForm = () => {
  const { control, handleSubmit, reset } = useForm<ChatValue>({
    defaultValues: defaultUserInput,
  });

  const dispatch = useAppDispatch();

  const questionAsked = useAppSelector(
    ({ userData }) => userData.chat.questionAsked
  );
  const credit = useAppSelector(({ userData }) => userData.chat.credit);

  const onSubmit: SubmitHandler<ChatValue> = ({ userInput }) => {
    if (userInput.length === 0) return;

    const questionToDispatch: ChatCompletionMessageParam = {
      content: userInput,
      role: "user",
    };

    dispatch(addUserQuestion(questionToDispatch));
    dispatch(askBot(userInput));
    reset();
  };

  const InputGroupClassName =
    credit && credit > 0
      ? "btn btn-outline-success d-flex align-items-center"
      : "d-flex align-items-center";

  const renderInputIcon = questionAsked ? (
    <Loader chat />
  ) : (
    <Icon chat iconName='Send' />
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='d-flex px-5 my-5'>
      <InputGroup>
        <ChatFormController control={control} />

        <InputGroup.Text
          className={InputGroupClassName}
          style={questionAsked ? { width: 60, pointerEvents: "none" } : {}}
        >
          {renderInputIcon}
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default ChatForm;
