import { Form } from "react-bootstrap";
import {
  ModalType,
  setModalType,
} from "../../redux/features/global/globalSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { clearAuthErrors } from "../../redux/features/user/userDataSlice";

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
      dispatch(clearAuthErrors());
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
