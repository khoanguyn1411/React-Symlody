import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthApi, RequestLoginResult } from "@/api";
import { APP_CONSTANTS } from "@/constants";
import { RootState } from "@/features/store";
import { IUser } from "@/features/types";

export type AuthState = {
  pending: boolean;
  user: IUser;
};

const initialState: AuthState = {
  pending: false,
  user: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const result: RequestLoginResult = await AuthApi.login(
      payload.email,
      payload.password
    );

    if (result.kind === "ok") {
      localStorage.setItem(APP_CONSTANTS.AUTH, result.result.token);
      return true;
    }
    return false;
  }
);

export const getMeAsync = createAsyncThunk("auth/getMe", async () => {
  const result = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return result.result;
  }

  return null;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
export default authSlice.reducer;
