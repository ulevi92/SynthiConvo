import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetIpRegistry, UserIp } from "../../../types/ipregistry";
import { DocumentSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { FirestoreUserDb } from "../../../types/firestore";

type InitialState = {
  requestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  ipInfo: UserIp;
  credit: number;
  isError: boolean;
};

const initialState: InitialState = {
  requestStatus: "idle",
  ipInfo: {
    ip: null,
    type: null,
  },
  credit: 1000,
  isError: false,
};

const key = import.meta.env.VITE_IP_REGISTRY_API_KEY;

export const fetchNewUser = createAsyncThunk(
  "user/createNewUser",
  async (payload: FirestoreUserDb) => {
    return await setDoc(doc(db, "users", payload.user.id), payload);
  }
);

export const fetchUpdateUserCredit = createAsyncThunk(
  "usere/credit",
  async (payload: { id: string; credit: number }) => {
    return await setDoc(doc(db, "users", payload.id), {
      user: {
        credit: payload.credit,
      },
    });
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUser",
  async (id: string) => {
    const docRef = doc(db, "users", id);

    const docSnapshot = (await getDoc(
      docRef
    )) as DocumentSnapshot<FirestoreUserDb>;

    return docSnapshot;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserIp(state, action: PayloadAction<GetIpRegistry>) {
      const { ip, security, type } = action.payload;
      const {
        is_abuser,
        is_anonymous,
        is_attacker,
        is_bogon,
        is_cloud_provider,
        is_proxy,
        is_relay,
        is_threat,
        is_tor,
        is_tor_exit,
        is_vpn,
      } = security;

      const ipInfo: UserIp = {
        ip,
        type,
        security: {
          abuser: is_abuser,
          anonymous: is_anonymous,
          attacker: is_attacker,
          bogon: is_bogon,
          cloudProvider: is_cloud_provider,
          proxy: is_proxy,
          relay: is_relay,
          threat: is_threat,
          tor: is_tor,
          torExit: is_tor_exit,
          vpn: is_vpn,
        },
      };

      if (localStorage.getItem("userIp")) return { ...state, ipInfo };

      state.ipInfo = ipInfo;
    },

    updateUserCredit(state, action: PayloadAction<number>) {
      state.credit = state.credit - action.payload;
    },

    setUserError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    clearUser() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.requestStatus = "pending";
      })
      .addCase(fetchNewUser.fulfilled, (state) => {
        state.requestStatus = "fulfilled";
      })
      .addCase(fetchNewUser.rejected, (state) => {
        state.requestStatus = "rejected";
      });

    builder
      .addCase(fetchUpdateUserCredit.pending, (state) => {
        state.requestStatus = "pending";
      })
      .addCase(fetchUpdateUserCredit.fulfilled, (state) => {
        state.requestStatus = "fulfilled";
      })
      .addCase(fetchUpdateUserCredit.rejected, (state) => {
        state.requestStatus = "rejected";
      });

    builder
      .addCase(getUserInfo.pending, (state) => {
        state.requestStatus = "pending";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        return { ...state, credit: action.payload.data()!.user.credit };
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.requestStatus = "rejected";
      });
  },
});

export const { clearUser, setUserIp, updateUserCredit, setUserError } =
  userSlice.actions;

export default userSlice.reducer;
