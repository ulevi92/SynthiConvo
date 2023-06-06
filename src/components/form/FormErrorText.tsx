import { Form } from "react-bootstrap";

interface Props {
  message: string;
  color?: "danger" | "warning";
}

const FormErrorText = ({ message, color = "danger" }: Props) => {
  return (
    <Form.Text className={`text-capitalize text-${color}`}>{message}</Form.Text>
  );
};

export default FormErrorText;
