import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { ChatValue } from "./ChatForm";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  control: Control<ChatValue, any>;
}

const ChatFormController = ({ control }: Props) => {
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

  return (
    <Controller
      disabled={disabled}
      name='userInput'
      control={control}
      render={({ field }) => (
        <Form.Control
          disabled={questionAsked || credit === 0}
          placeholder={placeholder()}
          {...field}
          size='lg'
        />
      )}
    />
  );
};

export default ChatFormController;
