import { LoginResult, RegisterResult } from "@/types/auth-result.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/utils/HttpClient";
import { User } from "@/types/user.type";
import { server } from "@/utils/constants";
import { RootState } from "../store";

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
}

const initialState: AuthState = {
  isAuthenticating: true,
  isAuthented: false,
  isError: false,
};

const login = createAsyncThunk("auth/login", async (value: User) => {
  const result = await httpClient.post<LoginResult>(server.LOGIN_URL, value);

  const { token } = result.data;
  if (token) {
    localStorage.setItem(server.TOKEN_KEY, token);
    return result.data;
  }

  throw Error();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // success
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthented = true;
      state.isAuthenticating = false;
      state.isError = false;
      state.loginResult = action.payload;
    });

    // failed
    builder.addCase(login.rejected, (state) => {
      state.isAuthented = false;
      state.isAuthenticating = false;
      state.isError = true;
    });

    // processing
    builder.addCase(login.pending, (state) => {
      state.isError = false;
      state.isAuthenticating = true;
    });
  },
});

export default authSlice.reducer;
export const authSelector = (state: RootState) => state.authReducer;
