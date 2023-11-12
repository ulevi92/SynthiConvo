import type { ChatLog } from "./openAI";

export type RequestStatus = "" | "" | "" | "";

export type FirestoreUserDb = {
  user: FirestoreUser;
};

export type FirestoreDbChatLog = {
  userLog: ChatLog[];
  botLog: ChatLog[];
};

type FirestoreUser = {
  id: string;
  credit: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
  ipInfo: {
    ip: string | null;
    previewsLoggedIps: string[];
  };
};
