import { Form } from "react-bootstrap";

interface Props {
  message: string;
}

const FormErrorText = ({ message }: Props) => {
  return (
    <Form.Text className={`text-capitalize text-danger`}>{message}</Form.Text>
  );
};

export default FormErrorText;
