import { useForm } from "react-hook-form";

import type { SubmitHandler } from "react-hook-form";
import type { FormInputs } from "./types";
import { Button } from "react-bootstrap";
import { handleClose } from "./AuthForm.helper";

interface Props {
  btnTask: "close" | "submit";
  handleButton: () => void;
}
type BtnType = "submit" | "button" | "reset" | undefined;

export const FormButton = ({ btnTask, handleButton }: Props) => {
  const varient = btnTask === "close" ? "outline-secondary" : "success";
  const classname =
    btnTask === "close" ? "text-uppercase mt-4" : "text-uppercase mx-2 mt-4";
  const type: BtnType = btnTask === "close" ? "button" : "submit";
  const text = btnTask === "close" ? "close" : "submit";

  return (
    <Button
      variant={varient}
      className={classname}
      type={type}
      onClick={handleButton}
    >
      {text}
    </Button>
  );
};
