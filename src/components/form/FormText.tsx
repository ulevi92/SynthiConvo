import { Form } from "react-bootstrap";

interface Props {
  message: string;
  color: "danger" | "success";
}

const FormText = ({ message, color }: Props) => {
  return (
    <Form.Text className={`text-capitalize text-${color}`}>{message}</Form.Text>
  );
};

export default FormText;
