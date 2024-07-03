import { LoginResult, RegisterResult } from "@/types/auth-result.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "@/utils/HttpClient";
import { User } from "@/types/user.type";
import { server } from "@/utils/constants";

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
});

export default authSlice.reducer;
