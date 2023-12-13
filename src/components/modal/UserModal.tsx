import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import {
  AboutModalText,
  AccountModalText,
  ClearConversationModalText,
} from "./UserModal.helper";

const UserModal = () => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector((state) => state.global.modalType);

  const Text: () => JSX.Element | null = () => {
    switch (modalType) {
      case "about":
        return <AboutModalText />;
      case "clear conversation":
      case "conversation":
        return <ClearConversationModalText />;

      case "account":
        return <AccountModalText />;

      default:
        return null;
    }
  };

  return <Text />;
};

export default UserModal;
