type Status = "idle" | "fulfilled" | "error" | "pending";

type InputTextType = string | null;

export type InputType = {
  email: InputTextType;
  password: InputTextType;
};

type CredentialError = string | undefined;

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
  errorMessage: CredentialError;
  input: InputType;
  user: User | null;
};

export const initialState: AuthSliceState = {
  status: "idle",
  isAuth: false,
  emailVerificationMessage: null,
  input: {
    email: null,
    password: null,
  },
  errorMessage: undefined,

  user: null,
};
