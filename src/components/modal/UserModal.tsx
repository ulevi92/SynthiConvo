import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { AboutModalText, ClearConversationModalText } from "./UserModal.helper";

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

      default:
        return null;
    }
  };

  return <Text />;
};

export default UserModal;
