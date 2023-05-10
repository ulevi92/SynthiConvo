import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { auth } from "../../firebase/firebase";
import {
  ChangePasswordPayload,
  ResetPasswordPayload,
  SignInAndUpPayload,
  UpdateProfilePayload,
  initialState,
} from "./authSlice.helper";
import store from "../../store/store";

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async ({ email, password }: SignInAndUpPayload) => {
    const response = await signInWithEmailAndPassword(auth, email!, password!);
    if (!response.user.emailVerified)
      await sendEmailVerification(response.user);

    return response.user;
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async ({ email, password }: SignInAndUpPayload) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email!,
      password!
    );
    return response.user;
  }
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

export const authStateChange = createAction<{
  uid: string;
  displayName: string | null;
  email: string | null;
} | null>("auth/authState");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //signing in
    builder.addCase(fetchSignIn.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.error.message;
    });

    //signing up and sending a verification email
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = "pending";
        state.emailVerificationMessage = "please verify your email";
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });
  },
});

export default authSlice.reducer;
