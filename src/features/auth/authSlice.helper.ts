type Status = "idle" | "fulfilled" | "error" | "pending";

type InputTextType = string | null;

export type InputType = {
  email: InputTextType;
  password: InputTextType;
};

type CredentialError = string | undefined;

type EmailVerificationMessage = string | null;

export type SignInAndUpArguments = {
  [key in keyof Pick<InputType, "email" | "password">]: InputType[key];
};

export type SignInAndUpPayload = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
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
  userUid: string;
  userDisplayName: string | null;
  userImg: string | null;
  userEmail: string | null;
  userEmailVerified: boolean;
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
  userUid: "",
  userDisplayName: null,
  userImg: null,
  userEmail: null,
  userEmailVerified: false,
};
