import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FormInputs } from "./types";
import FormText from "./FormText";

export const FormErrors = () => {
  const {
    formState: { errors },
  } = useForm<FormInputs>();

  const context = useMemo(() => {
    if (errors.email?.type === "pattern")
      return <FormText message='Not Valid Email' color='danger' />;

    return <></>;
  }, []);

  return context;
};
