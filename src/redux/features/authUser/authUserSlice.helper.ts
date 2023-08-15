export type Status = "idle" | "fulfilled" | "error" | "pending";

type InputTextType = string;

export type InputType = {
  email: InputTextType;
  password: InputTextType;
};

export type CredentialError = string | undefined;

export type EmailVerificationMessage = string | null;

export type SignInAndUpArguments = {
  [key in keyof Pick<InputType, "email" | "password">]: InputType[key];
};

export type SignInAndUpPayload = {
  credit: number;
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
};

export type ChangePasswordPayload = Pick<InputType, "password">;

export type ResetPasswordPayload = Pick<InputType, "email">;

export type UpdateProfilePayload = string;
