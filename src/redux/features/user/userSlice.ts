import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetIpRegistry, UserIp } from "../../../types/ipregistry";

type InitialState = {
  ipInfo: UserIp;
  credit: number;
};

const initialState: InitialState = {
  ipInfo: {
    ip: null,
    type: null,
  },
  credit: 1000,
};

const key = import.meta.env.VITE_IP_REGISTRY_API_KEY;

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

    clearUser() {
      return initialState;
    },
  },
});

export const { clearUser, setUserIp, updateUserCredit } = userSlice.actions;

export default userSlice.reducer;
