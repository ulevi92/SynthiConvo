import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { ChatValue } from "./ChatForm";
import { useAppSelector } from "../../redux/reduxHooks";
import {
  ModalType,
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";

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

    if (credit === 0) return "You are out of credit";

    return "Ask any question";
  };

  console.log(questionAsked || credit === 0);

  return (
    <Controller
      name='userInput'
      control={control}
      disabled={questionAsked || credit === 0}
      render={({ field }) => (
        <Form.Control placeholder={placeholder()} {...field} size='lg' />
      )}
    />
  );
};

export default ChatFormController;
