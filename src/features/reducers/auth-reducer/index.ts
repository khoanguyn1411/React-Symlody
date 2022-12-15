import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthApi } from "@/api";
import { RootState } from "@/features/store";
import {
  HttpError,
  Login,
  Profile,
  ProfileCreation,
  ProfileCreationDto,
  profileMapper,
} from "@/features/types";
import { changePasswordMapper } from "@/features/types/mappers/change-password.mapper";
import { loginMapper } from "@/features/types/mappers/login.mapper";
import { tokenMapper } from "@/features/types/mappers/token.mapper";
import { ChangePassword } from "@/features/types/models/change-password";
import { GlobalTypes, TokenService } from "@/utils";
import { catchHttpError } from "@/utils/services/error-handler-service";

import { getUsersAsync } from "../user-reducer";

export type AuthState = {
  pending: boolean;
  user: Profile;
  isAuth: boolean;
  isAlreadyGetMe: boolean;
};

const initialState: AuthState = {
  pending: false,
  user: null,
  isAuth: false,
  isAlreadyGetMe: false,
};

export const loginAsync = createAsyncThunk<
  boolean,
  Login,
  GlobalTypes.ReduxThunkRejectValue<false>
>("auth/login", async (payload, { rejectWithValue }) => {
  const loginInfoDto = loginMapper.toDto(payload);
  const result = await AuthApi.login(loginInfoDto);
  if (result.kind === "ok") {
    TokenService.setToken(tokenMapper.fromDto(result.result));
    return true;
  }
  return rejectWithValue(false);
});

export const changePasswordAsync = createAsyncThunk<
  true,
  ChangePassword,
  GlobalTypes.ReduxThunkRejectValue<HttpError<ChangePassword>>
>("auth/change-password", async (payload, { rejectWithValue }) => {
  const changePasswordDto = changePasswordMapper.toDto(payload);
  const result = await AuthApi.changePassword(changePasswordDto);
  if (result.kind === "ok") {
    return true;
  }
  return catchHttpError(changePasswordMapper, result, rejectWithValue, false);
});

export const getMeAsync = createAsyncThunk<
  Profile,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("auth/get-me", async (_, { rejectWithValue }) => {
  const result = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return profileMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async function (_, { dispatch }) {
    try {
      await AuthApi.logout();
    } catch (e) {
      throw new Error(e);
    } finally {
      dispatch({ type: "auth/logout" });
      dispatch(logout());
    }
  }
);

export const updateProfileAsync = createAsyncThunk<
  Profile,
  ProfileCreation,
  GlobalTypes.ReduxThunkRejectValue<HttpError<ProfileCreationDto> | null>
>("auth/update-profile", async (param, { rejectWithValue, dispatch }) => {
  const paramDto = profileMapper.toFormData(param);
  const result = await AuthApi.updateProfile(paramDto);
  if (result.kind === "ok") {
    dispatch(getUsersAsync());
    return profileMapper.fromDto(result.result);
  }
  if (result.kind === "bad-data") {
    const errorBadData = profileMapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(errorBadData);
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
    setIsAlreadyGetMe: (state, action: PayloadAction<boolean>) => {
      state.isAlreadyGetMe = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      TokenService.clearToken();
    },
    updateCurrentUser: (state, action: PayloadAction<Profile>) => {
      const { avatarUrl, ...rest } = action.payload;
      if (avatarUrl == null) {
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
      })

      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});
export const authStore = (state: RootState) => state.user;

export const { setIsAuth, logout, setIsAlreadyGetMe, updateCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
