import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthApi, RequestGetProfileResult } from "@/api";
import { RootState } from "@/features/store";
import { IUser } from "@/features/types/dtos/user";
import { TokenMapper } from "@/features/types/mappers/token.mapper";
import { GlobalTypes } from "@/types";
import { TokenService } from "@/utils";

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

export const loginAsync = createAsyncThunk<
  boolean,
  { username: string; password: string },
  GlobalTypes.ReduxThunkRejectValue<false>
>("auth/login", async (payload, { rejectWithValue }) => {
  const result = await AuthApi.login(payload.username, payload.password);

  if (result.kind === "ok") {
    TokenService.setToken(TokenMapper.fromDto(result.result));
    return true;
  }
  return rejectWithValue(false);
});

export const getMeAsync = createAsyncThunk<
  IUser,
  null,
  GlobalTypes.ReduxThunkRejectValue<IUser>
>("auth/login/me", async (payload, { rejectWithValue }) => {
  const result: RequestGetProfileResult = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return result.result;
  }

  return rejectWithValue(null);
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
      TokenService.clearToken();
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
