import type { ChatChoices, ChatLog, ChatMessage } from "./openAI";

export type RequestStatus = "" | "" | "" | "";

export type FirestoreUsersDb = {
  id: string;
  credit: number | null;
  email: string;
  displayName: string;
  emailVerified: boolean;
  ipInfo: {
    ip: string | null;
    previewsLoggedIps: string[];
  };
  chatHistory: ChatChoices[];
};

export type FirestoreDbChatLog = {
  userLog: ChatLog[];
  botLog: ChatLog[];
};

export type FirestoreUser = {
  id: string;
  credit: number | null;
  email: string;
  displayName: string;
  emailVerified: boolean;
  ipInfo: {
    ip: string | null;
    previewsLoggedIps: string[];
  };
  chatHistory: ChatChoices[];
};
