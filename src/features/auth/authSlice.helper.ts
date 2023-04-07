type Status = "idle" | "fulfilled" | "error" | "pending";

type InputTextType = string | null;

type InputType = {
  email: InputTextType;
  password: InputTextType;
  confirmPassword: InputTextType;
};

type CredentialError = {
  code: InputTextType;
  message: InputTextType;
};

type EmailVerificationMessage = string | null;

type User = {
  email: string | null;
  displayName: string | null;
  uid: string;
  emailVerified: boolean;
  providerId: string;
};

export type SignInAndUpPayload = {
  [key in keyof Pick<InputType, "email" | "password">]: InputType[key];
};

export type ChangePasswordPayload = Pick<InputType, "password">;

export type ResetPasswordPayload = Pick<InputType, "email">;

export type UpdateProfilePayload = string;

export type AuthSliceState = {
  status: Status;
  isAuth: boolean;
  emailVerificationMessage: EmailVerificationMessage;
  error: CredentialError;
  input: InputType;
  user: User;
};

export const initialState: AuthSliceState = {
  status: "idle",
  isAuth: false,
  emailVerificationMessage: null,
  input: {
    email: null,
    password: null,
    confirmPassword: null,
  },

  error: {
    code: null,
    message: null,
  },

  user: {
    email: null,
    displayName: null,
    uid: "",
    emailVerified: false,
    providerId: "",
  },
};
