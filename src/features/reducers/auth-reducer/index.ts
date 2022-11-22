import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthApi } from "@/api";
import { RootState } from "@/features/store";
import {
  IChangePassword,
  ILogin,
  IProfile,
  ProfileMapper,
} from "@/features/types";
import { ChangePasswordMapper } from "@/features/types/mappers/change-password.mapper";
import { LoginMapper } from "@/features/types/mappers/login.mapper";
import { TokenMapper } from "@/features/types/mappers/token.mapper";
import { GlobalTypes, TokenService } from "@/utils";

export type AuthState = {
  pending: boolean;
  user: IProfile;
  isAuth: boolean;
};

const initialState: AuthState = {
  pending: false,
  user: null,
  isAuth: false,
};

export const loginAsync = createAsyncThunk<
  boolean,
  ILogin,
  GlobalTypes.ReduxThunkRejectValue<false>
>("auth/login", async (payload, { rejectWithValue }) => {
  const loginInfoDto = LoginMapper.toDto(payload);
  const result = await AuthApi.login(loginInfoDto);
  if (result.kind === "ok") {
    TokenService.setToken(TokenMapper.fromDto(result.result));
    return true;
  }
  return rejectWithValue(false);
});

export const changePasswordAsync = createAsyncThunk<
  true,
  IChangePassword,
  GlobalTypes.ReduxThunkRejectValue<false>
>("auth/change-password", async (payload, { rejectWithValue }) => {
  const changePasswordDto = ChangePasswordMapper.toDto(payload);
  const result = await AuthApi.changePassword(changePasswordDto);
  if (result.kind === "ok") {
    return true;
  }
  return rejectWithValue(false);
});

export const getMeAsync = createAsyncThunk<
  IProfile,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("auth/login/me", async (_, { rejectWithValue }) => {
  const result = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return ProfileMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      TokenService.clearToken();
    },
    updateCurrentUser: (state, action: PayloadAction<IProfile>) => {
      const { avatar, ...rest } = action.payload;
      if (avatar == null) {
        state.user = { ...state.user, ...rest };
        return;
      }
      state.user = { ...rest, ...action.payload };
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

export const { setIsAuth, logout, updateCurrentUser } = authSlice.actions;

export default authSlice.reducer;
