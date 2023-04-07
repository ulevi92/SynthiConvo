import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { auth } from "../../firebase/firebase";
import {
  ChangePasswordPayload,
  ResetPasswordPayload,
  SignInAndUpPayload,
  UpdateProfilePayload,
  initialState,
} from "./authSlice.helper";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<SignInAndUpPayload>) {
      state.status = "pending";

      const email = action.payload.email!;
      const password = action.payload.password!;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCreditional) => {
          const { email, displayName, uid, emailVerified, providerId } =
            userCreditional.user;

          state.status = "fulfilled";
          state.isAuth = true;
          state.user = { email, displayName, uid, emailVerified, providerId };
        })
        .catch((error) => {
          state.status = "error";
          const { code, message } = error;
          state.error = { code, message };
        });
    },

    signUp(state, action: PayloadAction<SignInAndUpPayload>) {
      state.status = "pending";

      const email = action.payload.email!;
      const password = action.payload.password!;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCreditional) => {
          const { email, displayName, uid, emailVerified, providerId } =
            userCreditional.user;

          state.status = "fulfilled";
          state.isAuth = true;
          state.user = { email, displayName, uid, emailVerified, providerId };
        })
        .catch((error) => {
          state.status = "error";
          const { code, message } = error;
          state.error = { code, message };
        });
    },

    verifyEmail(state) {
      state.status = "pending";

      const user = auth.currentUser;

      user &&
        sendEmailVerification(user)
          .then(() => {
            state.status = "fulfilled";
          })
          .catch((error) => {
            state.status = "error";
            const { code, message } = error;
            state.error = { code, message };
          });
    },

    changePassword(state, action: PayloadAction<ChangePasswordPayload>) {
      state.status = "pending";

      const password = action.payload.password!;
      const user = auth.currentUser;

      user &&
        updatePassword(user, password)
          .then(() => {
            state.status = "fulfilled";
          })
          .catch((error) => {
            state.status = "error";
            const { code, message } = error;
            state.error = { code, message };
          });
    },

    resetPassword(state, action: PayloadAction<ResetPasswordPayload>) {
      state.status = "pending";

      const email = action.payload.email!;

      sendPasswordResetEmail(auth, email)
        .then(() => {
          state.status = "idle";
        })
        .catch((error) => {
          state.status = "error";
          const { code, message } = error;
          state.error = { code, message };
        });
    },

    updateProfileName(state, action: PayloadAction<UpdateProfilePayload>) {
      state.status = "pending";

      const user = auth.currentUser;
      const displayName = action.payload;

      user &&
        updateProfile(user, { displayName })
          .then(() => {
            state.status = "fulfilled";
          })
          .catch((error) => {
            state.status = "error";
            const { code, message } = error;
            state.error = { code, message };
          });
    },
  },
});

export const {
  signIn,
  changePassword,
  resetPassword,
  signUp,
  updateProfileName,
  verifyEmail,
} = authSlice.actions;

export default authSlice.reducer;
