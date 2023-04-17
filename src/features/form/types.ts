type EmailError = "please provide a valid email" | "email is required" | null;

type PasswordPatten =
  | "please enter a password"
  | "passwords don't match"
  | "your password should be at least 8 characters, container at least 1 uppercase, 1 lowercase and 1 number "
  | null;

export type InitialState = {
  email: string | null;
  emailError: EmailError;

  password: string | null;
  passwordError: PasswordPatten;

  confirmPassword: string | null;
};
