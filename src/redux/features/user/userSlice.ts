import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetIpRegistry, UserIp } from "../../../types/ipregistry";

type InitialState = {
  requestStatus: "idle" | "rejected" | "fulfilled" | "pending";
  user: UserIp;
};

type userSecurity = UserIp["security"];

const initialState: InitialState = {
  requestStatus: "idle",
  user: {
    ip: "",
    type: null,
  },
};

const key = import.meta.env.VITE_IP_REGISTRY_API_KEY;

export const fetchUserIp = createAsyncThunk("user", async () => {
  const response: Promise<GetIpRegistry> = (
    await fetch(`https://api.ipregistry.co/key=${key}`)
  ).json();

  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserIp.pending, (state) => {
      state.requestStatus = "pending";
    });

    builder.addCase(fetchUserIp.fulfilled, (state, action) => {
      const { ip, type, security: securityResponse } = action.payload;
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
      } = securityResponse;

      const security: userSecurity = {
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
      };

      return {
        ...state,
        requestStatus: "fulfilled",
        user: { ip, type, security },
      };
    });

    builder.addCase(fetchUserIp.rejected, (state) => {
      state.requestStatus = "rejected";
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
