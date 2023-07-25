import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { ChatValue } from "./ChatSubmitForm";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  control: Control<ChatValue, any>;
}

const ChatController = ({ control }: Props) => {
  const { questionAsked } = useAppSelector((state) => state.chat);

  const placeholder = questionAsked
    ? "Please wait until the AI finishes answering"
    : "Ask any question";

  return (
    <Controller
      name='userInput'
      control={control}
      render={({ field }) => (
        <Form.Control
          disabled={questionAsked}
          placeholder={placeholder}
          {...field}
          size='lg'
        />
      )}
    />
  );
};

export default ChatController;
