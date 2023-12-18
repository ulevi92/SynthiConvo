import { useAppSelector } from "../../redux/reduxHooks";
import AuthForm from "../form/AuthForm";
import UserModal from "./UserModal";

const AppModalBody = () => {
  const modalType = useAppSelector((state) => state.global.modalType);

  if (
    modalType === "login" ||
    modalType === "sign up" ||
    modalType === "passwordReminder"
  )
    return <AuthForm />;

  return <UserModal />;
};

export default AppModalBody;
