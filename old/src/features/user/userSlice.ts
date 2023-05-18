import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./userSlice.helper";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userIp = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
