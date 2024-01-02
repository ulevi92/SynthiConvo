import { Form } from "react-bootstrap";
import { FormType, setFormType } from "../../redux/features/global/globalSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { clearAuthErrors } from "../../redux/features/userData/userDataSlice";

interface Props {
  message: string;
  color?: "danger" | "warning" | "primary";
  className?: "add-pointer-cursor" | string;
  formType?: FormType;
}

const FormErrorText = ({
  message,
  color = "danger",
  className,
  formType,
}: Props) => {
  const dispatch = useAppDispatch();

  const changeFormType = () => {
    if (formType) {
      dispatch(setFormType(formType!));
      dispatch(clearAuthErrors());
    }
  };

  return (
    <Form.Text
      className={`text-capitalize text-${color} ${className}`}
      onClick={changeFormType}
    >
      {message}
    </Form.Text>
  );
};

export default FormErrorText;
