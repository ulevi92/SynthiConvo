import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./formSlice.helper";
import { emailPattern, passwordPattern } from "../../components/regExpPatterns";

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    saveFormEmail(state, action: PayloadAction<string>) {
      const isValidEmail = emailPattern.test(action.payload);

      return {
        ...state,
        email: isValidEmail ? action.payload : state.email,
        emailError: isValidEmail ? null : "please provide a valid email",
      };
    },

    saveFormPassword(state, action: PayloadAction<string>) {
      const isValidPassword = passwordPattern.test(action.payload);

      return {
        ...state,
        email: isValidPassword ? action.payload : state.password,
        passwordError: isValidPassword
          ? null
          : "your password should be at least 8 characters, container at least 1 uppercase, 1 lowercase and 1 number ",
      };
    },

    saveFormConfirmPassword(state, action: PayloadAction<string>) {
      const isConfirmPassword = state.password?.match(action.payload);

      return {
        ...state,
        confirmPassword: isConfirmPassword
          ? action.payload
          : state.confirmPassword,

        passwordError: isConfirmPassword ? null : "passwords don't match",
      };
    },
  },
});

export const { saveFormEmail, saveFormPassword, saveFormConfirmPassword } =
  formSlice.actions;

export default formSlice.reducer;
