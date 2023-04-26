import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {},
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
