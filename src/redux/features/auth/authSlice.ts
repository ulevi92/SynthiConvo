import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { auth } from "../../../firebase/firebase";
import type {
  CredentialError,
  EmailVerificationMessage,
  InputType,
  SignInAndUpArguments,
  SignInAndUpPayload,
  Status,
} from "./authSlice.helper";

export type AuthSliceState = {
  status: Status;
  isAuth: boolean;
  emailVerificationMessage: EmailVerificationMessage;
  errorMessage: CredentialError;
  input: InputType;
  userUid: string;
  userDisplayName: string | null;
  userImg: string | null;
  userEmail: string | null;
  userEmailVerified: boolean;
};

const initialState: AuthSliceState = {
  status: "idle",
  isAuth: false,
  emailVerificationMessage: null,
  input: {
    email: null,
    password: null,
  },
  errorMessage: undefined,
  userUid: "",
  userDisplayName: null,
  userImg: null,
  userEmail: null,
  userEmailVerified: false,
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async ({ email, password }: SignInAndUpArguments) => {
    const response = await signInWithEmailAndPassword(auth, email!, password!);

    const { displayName, emailVerified, photoURL, uid } = response.user;

    const user: SignInAndUpPayload = {
      displayName,
      email,
      emailVerified,
      photoURL,
      uid,
    };

    return user;
  }
);

export const fetchResetPassword = createAsyncThunk(
  "auth/fetchResetPassword",
  async (email: string) => await sendPasswordResetEmail(auth, email)
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async ({ email, password }: SignInAndUpArguments) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email!,
      password!
    );

    const { displayName, emailVerified, photoURL, uid } = response.user;

    const user: SignInAndUpPayload = {
      displayName,
      email,
      emailVerified,
      photoURL,
      uid,
    };

    return user;
  }
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;

      if (auth.currentUser) {
        const { email, emailVerified, displayName, photoURL, uid } =
          auth.currentUser;

        state.userDisplayName = displayName;
        state.userEmail = email;
        state.userEmailVerified = emailVerified;
        state.userImg = photoURL;
        state.userUid = uid;
      }
    },

    clearAuthErrors(state) {
      return { ...state, errorMessage: undefined, status: "idle" };
    },
  },
  extraReducers(builder) {
    //signing in
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchSignIn.fulfilled,
        (state, action: PayloadAction<SignInAndUpPayload>) => {
          state.status = "fulfilled";
          state.isAuth = true;

          const { uid, email, displayName, photoURL, emailVerified } =
            action.payload;
          state.userUid = uid;
          state.userEmail = email;
          state.userDisplayName = displayName;
          state.userImg = photoURL;
          state.userEmailVerified = emailVerified;
        }
      )
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message;
      });

    //signing up and sending a verification email
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = "pending";
        state.emailVerificationMessage = "please verify your email";
      })
      .addCase(
        fetchSignUp.fulfilled,
        (state, action: PayloadAction<SignInAndUpPayload>) => {
          state.status = "fulfilled";
          state.isAuth = true;

          const { uid, email, displayName, photoURL, emailVerified } =
            action.payload;
          state.userUid = uid;
          state.userEmail = email;
          state.userDisplayName = displayName;
          state.userImg = photoURL;
          state.userEmailVerified = emailVerified;
        }
      )
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });

    //signing out
    builder
      .addCase(fetchSignOut.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSignOut.fulfilled, () => {
        return { ...initialState, status: "fulfilled" };
      })
      .addCase(fetchSignOut.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });

    //reset password
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.status = "fulfilled";
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message;
      });
  },
});

export const { setAuth, clearAuthErrors } = authSlice.actions;
export default authSlice.reducer;
