import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Api,
  AuthApi,
  RequestGetProfileResult,
  RequestLoginResult,
  RequestRefreshResult,
} from "@/api";
import { APP_CONSTANTS } from "@/constants";
import { RootState } from "@/features/store";
import { IUser } from "@/features/types/dtos/user";

export type AuthState = {
  pending: boolean;
  user: IUser;
  isAuth: boolean;
};

const initialState: AuthState = {
  pending: false,
  user: null,
  isAuth: false,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }) => {
    const result: RequestLoginResult = await AuthApi.login(
      payload.username,
      payload.password
    );

    if (result.kind === "ok") {
      localStorage.setItem(APP_CONSTANTS.AUTH, result.result.access);
      return true;
    }
    return false;
  }
);

export const refreshTokenAsync = createAsyncThunk(
  "auth/refresh/token",
  async (payload: { token: string }) => {
    const result: RequestRefreshResult = await AuthApi.refreshToken(
      payload.token
    );

    if (result.kind === "ok") {
      localStorage.setItem(APP_CONSTANTS.AUTH, result.result.access);
      return true;
    }
    return false;
  }
);

export const getMeAsync = createAsyncThunk("auth/login/me", async () => {
  const result: RequestGetProfileResult = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return result.result;
  }

  return null;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      Api.clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(getMeAsync.rejected, (state) => {
        state.pending = false;
        state.user = null;
      });
  },
});
export const authStore = (state: RootState) => state.user;

export const { setIsAuth, logout } = authSlice.actions;

export default authSlice.reducer;
