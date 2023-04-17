import { InitialState } from "./types";

export const initialState: InitialState = {
  email: null,
  emailError: null,
  emailPatten: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,

  password: null,
  passwordError: null,
  passwordPatten: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,

  confirmPassword: null,
};
