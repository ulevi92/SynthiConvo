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

  ipInfo: {
    ip: string;
    security?: {
      isAbuser: boolean;
      isAttacker: boolean;
      isBogon: boolean;
      isCloudProvider: boolean;
      isProxy: boolean;
      isTor: boolean;
      isRelay: boolean;
      isTorExit: boolean;
      isVPN: boolean;
      isAnonymous: boolean;
      isThreat: boolean;
    };
  };

  userInfo: {
    displayName?: string;
    imgUrl?: string;
    email: string;
  };
};
