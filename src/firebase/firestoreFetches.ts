import { DocumentReference, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { FirestoreUser, FirestoreUsersDb } from "../types/firestore";
import { ChatMessage } from "../types/openAI";

export const postUserCreditAndHistory = async (
  chatHistory: ChatMessage[],
  credit: number
) => {
  const docRef = doc(db, "users", auth.currentUser?.uid!);

  const docSnap = await getDoc(docRef);

  const oldUserData = docSnap.data() as FirestoreUsersDb | undefined;

  if (!oldUserData) throw new Error("Couldn't fetch data");

  const newUserData: FirestoreUser | undefined = {
    ...oldUserData.user,
    chatHistory,
    credit,
  };

  const postData: FirestoreUsersDb = {
    user: newUserData,
  };

  return await setDoc(docRef, postData);
};

export const getUserCreditAndHistory = async () => {
  const docRef = doc(
    db,
    "users",
    auth.currentUser?.uid!
  ) as DocumentReference<FirestoreUsersDb>;
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
};
