import { Form } from "react-bootstrap";
import {
  ModalType,
  setModalType,
} from "../../redux/features/global/globalSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { cleanAuthCache } from "../../redux/features/auth/authSlice";

interface Props {
  message: string;
  color?: "danger" | "warning" | "primary";
  className?: "add-pointer-cursor" | string;
  modalType?: ModalType;
}

const FormErrorText = ({
  message,
  color = "danger",
  className,
  modalType,
}: Props) => {
  const dispatch = useAppDispatch();

  const changeModalType = () => {
    if (modalType) {
      dispatch(setModalType(modalType!));
      dispatch(cleanAuthCache());
    }
  };

  return (
    <Form.Text
      className={`text-capitalize text-${color} ${className}`}
      onClick={changeModalType}
    >
      {message}
    </Form.Text>
  );
};

export default FormErrorText;
