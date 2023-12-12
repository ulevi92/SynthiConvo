// Import necessary dependencies and types
import { ChatChoices, ChatMessage } from "../../../types/openAI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInAndUpArguments, SignInAndUpPayload } from "./userSlice.helper";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { GetIpRegistry } from "../../../types/ipregistry";
import {
  DocumentReference,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FirestoreUsersDb } from "../../../types/firestore";
import OpenAI from "openai";
import { RootState } from "../../store";
import { ChatCompletionMessageParam } from "openai/resources";

// Define types for chat log, used credit, and credit

type Log = {
  user: ChatChoices[];
  bot: ChatChoices[];
};

type UsedCredit = {
  id: number;
  creditUsed: number;
};

type Credit = {
  usedCredit: UsedCredit[];
  total: number | null;
};

// Define the initial state for the Redux slice
interface InitialState {
  auth: {
    isAuth: boolean;
    errorMessage: string | undefined;
    authLoading: boolean;
  };

  user: {
    userId: string | null;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
  };

  chat: {
    log: Log;
    questionAsked: boolean;
    isLoading: boolean;
    history: ChatChoices[];
    botIndex: number | null;
    credit: Credit;
  };

  errorMessage: string | undefined;
  errorFrom: "chat" | "auth" | null;
  error: boolean;
  userNotAllowed: boolean;
}

// Define the initial state with default values
const initialState: InitialState = {
  auth: {
    isAuth: false,
    errorMessage: undefined,
    authLoading: false,
  },

  user: {
    userId: null,
    displayName: null,
    email: null,
    emailVerified: false,
  },

  chat: {
    log: {
      bot: [],
      user: [],
    },
    questionAsked: false,
    isLoading: false,
    history: [],
    botIndex: null,
    credit: {
      usedCredit: [],
      total: null,
    },
  },

  error: false,
  errorMessage: undefined,
  errorFrom: null,
  userNotAllowed: false,
};

// Fetch the IP registry key from environment variables
const ipRegistryKey = import.meta.env.VITE_IP_REGISTRY_API_KEY;

// Create an asynchronous thunk for user sign-in
export const fetchSignIn = createAsyncThunk(
  "userAuth/fetchSignIn",
  async ({ email, password }: SignInAndUpArguments) => {
    // Initialize variables to be used in the function
    let isEmailVerified: boolean = false;
    let displayName: string = "";

    // 1. Fetch user credentials from Firebase
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email!,
      password!
    );

    // 2. Fetch the client's IP address using the ipregistry API
    const clientIp: GetIpRegistry = await fetch(
      `https://api.ipregistry.co/?key=${ipRegistryKey}`
    ).then((res) => res.json());

    // 3. Destructure user data from the Firebase user credentials
    const {
      uid,
      displayName: userDisplayName,
      emailVerified,
    } = userCredentials.user;

    // 4. Get user data from Firestore based on the user's UID
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    // 5. Extract user data from the Firestore document
    const data = docSnap.data() as FirestoreUsersDb;

    // 6. Check if the user's email is verified
    if (data.user.emailVerified) isEmailVerified = true;

    // 7. Set a default display name if it's empty or not provided
    if (data.user.displayName.length === 0 || !userDisplayName) {
      displayName = `user_${uid.slice(0, 6)}`;
    }

    // 8. Check if there are changes in user data (display name or email verification status) and update Firestore accordingly
    if (
      data.user.displayName !== userDisplayName ||
      data.user.emailVerified !== emailVerified
    ) {
      const newPayload: FirestoreUsersDb = {
        user: {
          ...data.user,
          emailVerified: isEmailVerified,
          displayName: displayName,
        },
      };

      await updateDoc(docRef, newPayload);
    }

    // 9. Check if the current user's IP is not in the list of previously logged IPs and update it in Firestore
    if (
      !data.user.ipInfo.previewsLoggedIps.find(
        (ip) => ip === data.user.ipInfo.ip
      )
    ) {
      const newIpPayload: FirestoreUsersDb = {
        user: {
          ...data.user,
          ipInfo: {
            ip: clientIp.ip,
            previewsLoggedIps: [
              ...data.user.ipInfo.previewsLoggedIps,
              clientIp.ip,
            ],
          },
        },
      };

      await updateDoc(docRef, newIpPayload);
    }

    // 10. Extract user credit and history from Firestore
    const { credit, chatHistory: history } = data.user;

    // 11. Build the user object with relevant information
    const user: SignInAndUpPayload = {
      credit,
      displayName,
      email,
      emailVerified: isEmailVerified,
      uid,
      history,
    };

    // 12. Return an object containing user-related data along with the client's IP
    return { user, clientIp };
  }
);

export const fetchSignUp = createAsyncThunk(
  "userAuth/fetchSignUp",
  async ({ email, password }: SignInAndUpArguments) => {
    // 1. Create a new user account with Firebase authentication
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email!,
      password!
    );

    // 2. Fetch the client's IP address using the ipregistry API
    const clientIp: GetIpRegistry = await fetch(
      `https://api.ipregistry.co/?key=${ipRegistryKey}`
    )
      .then((res) => res.json())
      .then((data) => data);

    // 3. Extract user ID (UID) from the created user credentials
    const { uid } = userCredentials.user;

    // 4. Extract IP address from the clientIp object
    const { ip } = clientIp;

    // 5. Create a new user object with relevant information
    const user = userCredentials.user;

    // 6. Prepare Firestore payload for the new user
    const firestorePayload: FirestoreUsersDb = {
      user: {
        id: uid,
        credit: 1000,
        emailVerified: false,
        email,
        displayName: "user_" + uid.slice(0, 6),
        ipInfo: {
          ip,
          previewsLoggedIps: [...[], ip],
        },
        chatHistory: [],
      },
    };

    // 7. Set Firestore document for the new user with the prepared payload
    await setDoc(doc(db, "users", uid), firestorePayload);

    // 8. Return an object containing the new user and the client's IP
    return { user, clientIp };
  }
);

export const fetchSignOut = createAsyncThunk(
  "userAuth/fetchSignOut",
  async () => {
    // 1. Sign out the user using Firebase authentication
    const signOutResponse = await signOut(auth);

    // 2. Return the response from the sign-out operation
    return signOutResponse;
  }
);

export const fetchResetPassword = createAsyncThunk(
  "userAuth/fetchResetPassword",
  async (email: string) => {
    // 1. Send a password reset email to the specified email address using Firebase authentication
    const resetPasswordResponse = await sendPasswordResetEmail(auth, email);

    // 2. Return the response from the password reset operation
    return resetPasswordResponse;
  }
);

export const fetchEmailVerification = createAsyncThunk(
  "userAuth/fetchEmailVerification",
  async () => {
    // 1. Get the current user from Firebase authentication
    const user = auth.currentUser;

    // 2. Check if there is a user (non-null) and send an email verification if available
    const response = user && (await sendEmailVerification(user));

    // 3. Return the response from the email verification operation
    return response;
  }
);

//dealing with chat

export const openAiRequest = new OpenAI({
  // 1. Set up an instance of the OpenAI API client with the provided API key
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  // 2. Allow making API requests in the browser (Note: Be cautious about security implications)
  dangerouslyAllowBrowser: true,
  // 3. Set the maximum number of retries in case of API failures
  maxRetries: 3,
});

export const askBot = createAsyncThunk(
  "askingBot",
  async (userContent: string | null, { getState }) => {
    // 1. Extract the chat history from the current state using Redux state management

    const state = getState() as RootState;

    const history: ChatCompletionMessageParam[] = state.user.chat.history.map(
      ({ message: { content, role } }) => ({
        content,
        role,
      })
    );

    // 2. Make an asynchronous request to the OpenAI API to generate a response from the chat model
    const response = await openAiRequest.chat.completions.create({
      // 3. Specify the model to be used for generating the completion (GPT-3.5-turbo)
      model: "gpt-3.5-turbo",
      // 4. Combine the existing chat history with the new user message to form the input messages
      messages: [...history, { content: userContent, role: "user" }],
      // 5. Set a limit on the number of tokens in the generated completion
      max_tokens: 10,
    });

    // 6. Return the response from the OpenAI API
    return response;
  }
);

export const fetchChatLog = createAsyncThunk(
  "userChat/fetchChatLog",
  async () => {
    const docRef = doc(
      db,
      "users",
      auth.currentUser?.uid!
    ) as DocumentReference<FirestoreUsersDb>;

    // 1. Retrieve the Firestore document data using the user's document reference
    const data = (await getDoc(docRef)).data()!;

    // 2. Extract the chat history from the Firestore document data
    return data.user.chatHistory;
  }
);

export const updateUserLog = createAsyncThunk(
  "userChat/updateUserLog",
  async (userLog: ChatChoices) => {
    const docRef = doc(
      db,
      "users",
      auth.currentUser?.uid!
    ) as DocumentReference<FirestoreUsersDb>;

    // 1. Retrieve the Firestore document data using the user's document reference
    const data = (await getDoc(docRef)).data()!;

    // 2. Update the Firestore document with the new user log added to the chat history
    return await updateDoc(docRef, {
      user: {
        ...data.user,
        chatHistory: [...data.user.chatHistory, userLog],
      },
    });
  }
);

export const updateBotLog = createAsyncThunk(
  "userChat/updateBotLog",
  async (botLog: ChatChoices) => {
    const docRef = doc(
      db,
      "users",
      auth.currentUser?.uid!
    ) as DocumentReference<FirestoreUsersDb>;

    // 1. Retrieve the Firestore document data using the user's document reference
    const data = (await getDoc(docRef)).data()!;

    // 2. Update the Firestore document with the new bot log added to the chat history
    return await updateDoc(docRef, {
      user: {
        ...data.user,
        chatHistory: [...data.user.chatHistory, botLog],
      },
    });
  }
);

export const updateUserCreditAndHistory = createAsyncThunk(
  "userChat/updateUserCreditAndHistory",
  async (args: { credit: number; history: ChatChoices[] }) => {
    // 1. Retrieve the Firestore document reference for the current user
    const docRef = doc(
      db,
      "users",
      auth.currentUser?.uid!
    ) as DocumentReference<FirestoreUsersDb>;

    // 2. Update the Firestore document with the new credit and chat history
    return await updateDoc(docRef, {
      user: {
        chatHistory: args.history,
        credit: args.credit,
      },
    });
  }
);

export const resetUserHistory = createAsyncThunk(
  "userChat/resetUserHistory",
  async () => {
    // 1. Retrieve the Firestore document reference for the current user
    const docRef = doc(
      db,
      "users",
      auth.currentUser?.uid!
    ) as DocumentReference<FirestoreUsersDb>;

    // 2. Reset the user's chat history in Firestore by updating the document
    return await updateDoc(docRef, {
      user: {
        chatHistory: [],
      },
    });
  }
);

// Create a Redux slice for user-related state management
const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      // 1. Update the authentication state based on the action payload
      state.auth.isAuth = action.payload;

      // 2. If there is a current user authenticated, update user-related state
      if (auth.currentUser) {
        // 3. Destructure user information from the Firebase currentUser object
        const { email, emailVerified, displayName, photoURL, uid } =
          auth.currentUser;

        // 4. Update user-related state in the Redux store
        state.user.displayName = displayName;
        state.user.email = email;
        state.user.emailVerified = emailVerified;
        state.user.userId = uid;
      }
    },

    clearAuthErrors(state) {
      // 1. Create a new state object by spreading the current state
      return {
        ...state,
        // 2. Update the auth slice with a new object, resetting errorMessage and requestStatus
        auth: { ...state.auth, errorMessage: undefined, requestStatus: "idle" },
        // 3. Update the top-level requestStatus to "idle"
        requestStatus: "idle",
      };
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      // Update the state with the loading status received from the action payload
      state.auth.authLoading = action.payload;
    },

    addUserQuestion(state, action: PayloadAction<ChatMessage>) {
      // Create a new user object with the provided user content
      const newUserObj: ChatChoices = {
        finishReason: "stop",
        index: state.chat.log.user.length,
        message: {
          role: "user",
          content: action.payload.content,
        },
      };

      // Save the user question to the chat history
      state.chat.history = [...state.chat.history, newUserObj];

      // Save the user question to the user log
      state.chat.log.user = [...state.chat.log.user, newUserObj];

      // Save the user output to localStorage
      localStorage.setItem("chat", JSON.stringify(state.chat.history));
      localStorage.setItem("credit", JSON.stringify(state.chat.credit.total));
    },

    resetChatHistory(state) {
      // Reset the chat history to an empty array
      return { ...state, history: [] };
    },

    addOldHistory(state, action: PayloadAction<ChatChoices[]>) {
      // Replace the current chat history with the provided old history
      state.chat.history = action.payload;
    },

    addOldCreditRecord(state, action: PayloadAction<number>) {
      // Replace the current total credit with the provided old credit record
      state.chat.credit.total = action.payload;
    },
  },
  extraReducers(builder) {
    // Handle the pending state of the asynchronous thunk
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.auth.authLoading = true;
      })
      // Handle the fulfilled state of the asynchronous thunk
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        const { uid, credit, displayName, email, emailVerified, history } =
          action.payload.user;
        const { security } = action.payload.clientIp;

        // Update user-related state after successful sign-in
        state.auth.isAuth = true;
        state.user.displayName = displayName;
        state.user.userId = uid;
        state.user.emailVerified = emailVerified;
        state.user.email = email;

        // Initialize credit state with received credit information
        const creditInjection: Credit = {
          total: credit,
          usedCredit: [],
        };
        state.chat.credit = creditInjection;

        state.chat.history = history;

        // Check if any security flags are true and update state accordingly
        const isSecurityTrue = Object.values(security).some((value) => value);
        if (isSecurityTrue) {
          state.error = true;
          state.userNotAllowed = true;
        }

        state.auth.authLoading = false;
      })
      // Handle the rejected state of the asynchronous thunk
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.error = true;
        state.errorFrom = "auth";
        state.errorMessage = action.error.message;
        state.auth.authLoading = false;
      })

      .addCase(fetchSignUp.pending, (state) => {
        state.auth.authLoading = true;
      })

      .addCase(fetchSignUp.fulfilled, (state, action) => {
        const { email, emailVerified, displayName, uid } = action.payload.user;
        const { security } = action.payload.clientIp;

        state.auth.isAuth = true;
        state.user.displayName = displayName;
        state.user.userId = uid;
        state.user.emailVerified = emailVerified;
        state.user.email = email;

        const isSecurityTrue = Object.values(security).some((value) => value);
        if (isSecurityTrue) {
          state.error = true;
          state.userNotAllowed = true;
        }

        state.auth.authLoading = false;
      })

      .addCase(fetchSignUp.rejected, (state, action) => {
        state.error = true;
        state.errorFrom = "auth";
        state.errorMessage = action.error.message;
        state.auth.authLoading = false;
      })

      .addCase(fetchSignOut.pending, (state) => {
        state.auth.authLoading = true;
      })

      .addCase(fetchSignOut.fulfilled, (state) => {
        state.auth.isAuth = false;
        state.auth.authLoading = false;
      })

      .addCase(fetchSignOut.rejected, (state, action) => {
        state.auth.authLoading = false;
        state.error = true;
        state.errorFrom = "auth";
        state.errorMessage = action.error.message;
      })

      .addCase(fetchResetPassword.pending, (state) => {
        state.auth.authLoading = true;
      })

      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.auth.authLoading = false;
      })

      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.auth.authLoading = false;
        state.error = true;
        state.errorFrom = "auth";
        state.errorMessage = action.error?.message;
      })

      .addCase(fetchEmailVerification.pending, (state) => {
        state.auth.authLoading = true;
      })

      .addCase(fetchEmailVerification.fulfilled, (state) => {
        state.auth.authLoading = false;
      })

      .addCase(fetchEmailVerification.rejected, (state, action) => {
        state.auth.authLoading = false;
        state.error = true;
        state.errorFrom = "auth";
        state.errorMessage = action.error?.message;
      })

      .addCase(fetchChatLog.pending, (state) => {
        state.chat.isLoading = true;
      })

      .addCase(fetchChatLog.fulfilled, (state, action) => {
        state.chat.history = action.payload;
        state.chat.isLoading = false;
      })

      .addCase(fetchChatLog.rejected, (state, action) => {
        state.chat.isLoading = false;
        state.error = true;
        state.errorFrom = "chat";
        state.errorMessage = action.error.message;
      })

      .addCase(updateUserLog.pending, (state) => {
        state.chat.isLoading = true;
      })
      .addCase(updateUserLog.fulfilled, (state) => {
        state.chat.isLoading = false;
      })
      .addCase(updateUserLog.rejected, (state, action) => {
        state.chat.isLoading = false;
        state.error = true;
        state.errorFrom = "chat";
        state.errorMessage = action.error.message;
      })

      .addCase(updateBotLog.pending, (state) => {
        state.chat.isLoading = true;
      })
      .addCase(updateBotLog.fulfilled, (state) => {
        state.chat.isLoading = false;
      })
      .addCase(updateBotLog.rejected, (state, action) => {
        state.chat.isLoading = false;
        state.error = true;
        state.errorFrom = "chat";
        state.errorMessage = action.error.message;
      })

      .addCase(updateUserCreditAndHistory.pending, (state) => {
        state.chat.isLoading = true;
      })
      .addCase(updateUserCreditAndHistory.fulfilled, (state) => {
        state.chat.isLoading = false;
      })
      .addCase(updateUserCreditAndHistory.rejected, (state, action) => {
        state.chat.isLoading = false;
        state.error = true;
        state.errorFrom = "chat";
        state.errorMessage = action.error.message;
      })

      .addCase(resetUserHistory.pending, (state) => {
        state.chat.isLoading = true;
      })
      .addCase(resetUserHistory.fulfilled, (state) => {
        state.chat.isLoading = false;
      })
      .addCase(resetUserHistory.rejected, (state, action) => {
        state.chat.isLoading = false;
        state.error = true;
        state.errorFrom = "chat";
        state.errorMessage = action.error.message;
      });
  },
});

// Export actions and reducer from the created slice
export const {
  clearAuthErrors,
  setAuth,
  setAuthLoading,
  addOldCreditRecord,
  addOldHistory,
  addUserQuestion,
  resetChatHistory,
} = userSlice.actions;
export default userSlice.reducer;
