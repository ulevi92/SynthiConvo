import { ChatChoices } from "./openAI";

type InputTextType = string;

export type InputType = {
  email: InputTextType;
  password: InputTextType;
};

export type SignInAndUpArguments = {
  [key in keyof Pick<InputType, "email" | "password">]: InputType[key];
};

export type SignInAndUpPayload = {
  credit: number | null;
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  history: ChatChoices[];
};

export type chatLog = {
  user: ChatChoices[];
  bot: ChatChoices[];
};

export type StoredChatData = {
  history: ChatChoices[];
  credit: number | null;
};
