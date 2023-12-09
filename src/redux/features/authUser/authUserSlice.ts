import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { auth, db } from "../../../firebase/firebase";
import type {
  CredentialError,
  SignInAndUpArguments,
  SignInAndUpPayload,
  Status,
} from "./authUserSlice.helper";
import { GetIpRegistry } from "../../../types/ipregistry";
import {
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FirestoreUsersDb } from "../../../types/firestore";

const key = import.meta.env.VITE_IP_REGISTRY_API_KEY;

type InitialState = {
  auth: {
    requestStatus: Status;
    isAuth: boolean;
    errorMessage: CredentialError;
    authLoading: boolean;
  };

  user: {
    userId: string | null;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
  };

  requestStatus: Status;
  userNotAllowed: boolean;
};

const initialState: InitialState = {
  auth: {
    requestStatus: "idle",
    errorMessage: undefined,
    isAuth: false,
    authLoading: false,
  },

  user: {
    displayName: null,
    email: null,
    emailVerified: false,
    userId: null,
  },

  requestStatus: "idle",
  userNotAllowed: false,
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async ({ email, password }: SignInAndUpArguments) => {
    //fetch firebase
    const userCreditials = await signInWithEmailAndPassword(
      auth,
      email!,
      password!
    );

    //fetch to get client ip
    const clientIp: GetIpRegistry = await fetch(
      `https://api.ipregistry.co/?key=${key}`
    )
      .then((res) => res.json())
      .then((data) => data);

    const { uid } = userCreditials.user;

    //get data from firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    const firestoreUser = docSnap.data() as FirestoreUsersDb;

    //post user new ip if it's not === to stored ip
    if (
      !firestoreUser.user.ipInfo.previewsLoggedIps.find(
        (ip) => ip === firestoreUser.user.ipInfo.ip
      )
    ) {
      //creating a new payload for the current ip, and saving it
      const newIpPayload: FirestoreUsersDb = {
        user: {
          ...firestoreUser.user,
          ipInfo: {
            ip: clientIp.ip,
            previewsLoggedIps: [
              ...firestoreUser.user.ipInfo.previewsLoggedIps,
              clientIp.ip,
            ],
          },
        },
      };

      await updateDoc(docRef, newIpPayload);
    }

    const { credit, displayName, emailVerified } = firestoreUser.user;

    const user: SignInAndUpPayload = {
      credit,
      displayName,
      email,
      emailVerified,
      uid,
    };

    return { user, clientIp };
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async ({ email, password }: SignInAndUpArguments) => {
    const userCreditials = await createUserWithEmailAndPassword(
      auth,
      email!,
      password!
    );

    const clientIp: GetIpRegistry = await fetch(
      `https://api.ipregistry.co/?key=${key}`
    )
      .then((res) => res.json())
      .then((data) => data);

    const { uid } = userCreditials.user;

    const { ip } = clientIp;

    const user = userCreditials.user;

    const firestorePayload: FirestoreUsersDb = {
      user: {
        id: uid,
        credit: 1000,
        emailVerified: false,
        email,
        displayName: "user_" + uid.slice(0, 4),
        ipInfo: {
          ip,
          previewsLoggedIps: [...[], ip],
        },
        chatHistory: [],
      },
    };

    await setDoc(doc(db, "users", uid), firestorePayload);

    return { user, clientIp };
  }
);

export const fetchResetPassword = createAsyncThunk(
  "auth/fetchResetPassword",
  async (email: string) => await sendPasswordResetEmail(auth, email)
);

export const fetchSignOut = createAsyncThunk(
  "auth/fetchSignOut",
  async () => await signOut(auth)
);

//verifyEmail
export const verifyEmail = async () => {
  const user = auth.currentUser;

  try {
    user && sendEmailVerification(user);
  } catch (error) {
    const { message } = error as Error;

    throw new Error(message);
  }
};

export const fetchEmailVerification = createAsyncThunk(
  "auth/fetchEmailVerification",
  async () => {
    const user = auth.currentUser;

    const response = user && sendEmailVerification(user);

    return response;
  }
);

//creating redux slice
const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth.isAuth = action.payload;

      if (auth.currentUser) {
        const { email, emailVerified, displayName, photoURL, uid } =
          auth.currentUser;

        state.user.displayName = displayName;
        state.user.email = email;
        state.user.emailVerified = emailVerified;
        state.user.userId = uid;
      }
    },

    clearAuthErrors(state) {
      return {
        ...state,
        auth: { ...state.auth, errorMessage: undefined, requestStatus: "idle" },
        requestStatus: "idle",
      };
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.auth.authLoading = action.payload;
    },
  },

  extraReducers(builder) {
    //signing in
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.auth.requestStatus = "pending";
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        const {
          user: { displayName, email, emailVerified, uid, credit },
          clientIp: { security },
        } = action.payload;

        state.auth.requestStatus = "fulfilled";
        state.auth.isAuth = true;

        state.user.displayName = displayName;
        state.user.email = email;
        state.user.emailVerified = emailVerified;

        state.user.userId = uid;
      })

      .addCase(fetchSignIn.rejected, (state, action) => {
        state.auth.requestStatus = "error";
        state.auth.errorMessage = action.error.message;
      });

    //signing up and sending a verification email
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.auth.requestStatus = "pending";
      })

      .addCase(fetchSignUp.fulfilled, (state, action) => {
        const {
          user: { displayName, email, emailVerified, uid },
          clientIp: { security },
        } = action.payload;

        //checking user is not - abuser / vpn / attacker etc...
        if (
          security.is_abuser ||
          security.is_anonymous ||
          security.is_attacker ||
          security.is_bogon ||
          security.is_cloud_provider ||
          security.is_proxy ||
          security.is_relay ||
          security.is_threat ||
          security.is_tor ||
          security.is_tor_exit ||
          security.is_vpn
        )
          return { ...state, userNotAllowed: true };

        state.auth.isAuth = true;
        state.auth.requestStatus = "fulfilled";

        state.user.displayName = displayName;
        state.user.email = email;
        state.user.displayName = displayName;
        state.user.emailVerified = emailVerified;
        state.user.userId = uid;
      })

      .addCase(fetchSignUp.rejected, (state, action) => {
        state.auth.errorMessage = action.error.message;
      });

    //signing out
    builder
      .addCase(fetchSignOut.pending, (state) => {
        state.auth.requestStatus = "pending";
      })
      .addCase(fetchSignOut.fulfilled, () => {
        return { ...initialState, requestStatus: "fulfilled" };
      })
      .addCase(fetchSignOut.rejected, (state, action) => {
        state.auth.errorMessage = action.error.message;
      });

    //reset password
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.auth.requestStatus = "pending";
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.auth.requestStatus = "fulfilled";
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.auth.requestStatus = "error";
        state.auth.errorMessage = action.error.message;
      });

    //send a email verification manually
    builder
      .addCase(fetchEmailVerification.pending, (state) => {
        state.auth.requestStatus = "pending";
      })
      .addCase(fetchEmailVerification.fulfilled, (state) => {
        state.auth.requestStatus = "fulfilled";
      })
      .addCase(fetchEmailVerification.rejected, (state, action) => {
        state.auth.requestStatus = "error";
        state.auth.errorMessage = action.error.message;
      });
  },
});

export const { setAuth, clearAuthErrors, setAuthLoading } =
  authUserSlice.actions;
export default authUserSlice.reducer;
