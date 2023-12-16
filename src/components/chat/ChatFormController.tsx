import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import type {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import { ChatValue } from "./ChatForm";
import { useAppSelector } from "../../redux/reduxHooks";
import Icon from "../Icon";
import { FC } from "react";

interface Props {
  control: Control<ChatValue, any>;
  onSubmit: SubmitHandler<ChatValue>;
  handleSubmit: UseFormHandleSubmit<ChatValue, undefined>;
}

const ChatFormController: FC<Props> = ({ control, onSubmit, handleSubmit }) => {
  const questionAsked = useAppSelector(
    ({ userData }) => userData.chat.questionAsked
  );
  const credit = useAppSelector(({ userData }) => userData.chat.credit);

  const placeholder = () => {
    if (questionAsked) return "Please wait until the AI finishes answering";

    if (credit === 0) return "you have no credit";

    return "Ask any question";
  };

  const disabled = credit === 0;

  const InputGroupClassName =
    credit && credit > 0
      ? "btn btn-outline-success d-flex align-items-center"
      : "d-flex align-items-center";

  return (
    <Controller
      disabled={disabled}
      name='userInput'
      control={control}
      render={({ field }) => (
        <InputGroup>
          <Form.Control
            disabled={questionAsked || credit === 0}
            placeholder={placeholder()}
            {...field}
            size='lg'
          />

          <InputGroup.Text className={InputGroupClassName}>
            <Icon chat iconName='Send' onClick={handleSubmit(onSubmit)} />
          </InputGroup.Text>
        </InputGroup>
      )}
    />
  );
};

export default ChatFormController;
