import type { ChatLog } from "./chat";

type FireStoreDbUserInfo = {
  displayName: string;
  emailVerified: boolean;
  ip: string;
};

type FirestoreDbChatLog = {
  userLog: ChatLog[];
  botLog: ChatLog[];
};

type UserInfo = {
  ipInfo: {
    ip: string;
    security: {
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
    displayName: string | null;
    imgUrl: string | null;
  };
};

type FirestoreUser = {};

interface FirestoreDB {}
