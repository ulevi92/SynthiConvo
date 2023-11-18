import type { ChatLog, ChatMessage } from "./openAI";

export type RequestStatus = "" | "" | "" | "";

export type FirestoreUsersDb = {
  user: FirestoreUser;
};

export type FirestoreDbChatLog = {
  userLog: ChatLog[];
  botLog: ChatLog[];
};

export type FirestoreUser = {
  id: string;
  credit: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
  ipInfo: {
    ip: string | null;
    previewsLoggedIps: string[];
  };
  chatHistory: ChatMessage[];
};
