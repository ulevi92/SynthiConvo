import type { ChatLog } from "./chat";

export type FirestoreUserDb = {
  user: FirestoreUser;
};

type FirestoreDbChatLog = {
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
