import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
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
  history: ChatCompletionMessageParam[];
};

export type chatLog = {
  user: ChatChoices[];
  bot: ChatCompletion.Choice[];
};

export type StoredChatData = {
  history: ChatCompletionMessageParam[];
  credit: number | null;
};
