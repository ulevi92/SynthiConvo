import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { ChatValue } from "./ChatForm";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  control: Control<ChatValue, any>;
}

const ChatFormController = ({ control }: Props) => {
  const { questionAsked, totalCredit } = useAppSelector((state) => ({
    questionAsked: state.user.chat.questionAsked,
    totalCredit: state.user.chat.credit.total,
  }));

  const placeholder = questionAsked
    ? "Please wait until the AI finishes answering"
    : "Ask any question";

  return (
    <Controller
      name='userInput'
      control={control}
      render={({ field }) => (
        <Form.Control
          disabled={questionAsked || totalCredit === 0}
          placeholder={placeholder}
          {...field}
          size='lg'
        />
      )}
    />
  );
};

export default ChatFormController;
