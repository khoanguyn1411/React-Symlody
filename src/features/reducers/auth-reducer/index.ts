import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthApi } from "@/api";
import { RootState } from "@/features/store";
import {
  ErrorResponse,
  Login,
  Profile,
  profileMapper,
  Token,
} from "@/features/types";
import { loginMapper } from "@/features/types/mappers/login.mapper";
import { tokenMapper } from "@/features/types/mappers/token.mapper";
import { TokenService } from "@/utils/funcs/token-service";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
import { ReduxThunk } from "@/utils/types";

export type AuthState = {
  pending: boolean;
  user: Profile;
  isAuth: boolean;
  isAlreadyGetMe: boolean;
};

const initialState: AuthState = {
  pending: true,
  user: null,
  isAuth: false,
  isAlreadyGetMe: false,
};

export const loginAsync = createAsyncThunk<
  Token,
  Login,
  ReduxThunk.RejectValue<ErrorResponse<Login>>
>("auth/login", async (payload, { rejectWithValue }) => {
  const loginInfoDto = loginMapper.toDto(payload);
  const result = await AuthApi.login(loginInfoDto);

  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: loginMapper,
    fromDtoMapperSupport: tokenMapper,
  });
});

export const getMeAsync = createAsyncThunk<
  Profile,
  null,
  ReduxThunk.RejectValue<null>
>("auth/get-me", async (_, { rejectWithValue }) => {
  const result = await AuthApi.getProfile();
  if (result.kind === "ok") {
    return profileMapper.fromDto(result.result_dto);
  }

  return rejectWithValue(null);
});

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async function (_, { dispatch }) {
    try {
      await AuthApi.logout();
      TokenService.clearToken();
      dispatch(setIsAuth(false));
    } catch (e) {
      throw new Error(e);
    } finally {
      dispatch({ type: "auth/logout" });
    }
  }
);

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
      });
  },
});
export const authStore = (state: RootState) => state.user;

export const { setIsAuth, setIsAlreadyGetMe, updateCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
