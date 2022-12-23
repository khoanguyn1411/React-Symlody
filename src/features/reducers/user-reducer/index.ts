import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserApi } from "@/api";
import { RootState } from "@/features/store";
import {
  HttpError,
  Profile,
  ProfileCreation,
  ProfileCreationDto,
  profileMapper,
  User,
  userMapper,
} from "@/features/types";
import { changePasswordMapper } from "@/features/types/mappers/change-password.mapper";
import { ChangePassword } from "@/features/types/models/change-password";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { ReduxThunk, StrictOmit } from "@/utils/types";

import { updateCurrentUser } from "../auth-reducer";
import { initialState, userAdapter } from "./state";

export const addUser = createAsyncThunk("user/add", (user: User) => user);
export const updateUser = createAsyncThunk(
  "user/update",
  (param: { id: User["id"]; payload: StrictOmit<User, "id"> }) => param
);
export const removeUser = createAsyncThunk(
  "user/remove",
  (id: User["id"]) => id
);

export const getUsersAsync = createAsyncThunk<
  User[],
  null,
  ReduxThunk.RejectValue<[]>
>("user/get-list", async (_, { rejectWithValue }) => {
  const result = await UserApi.getUsers();
  if (result.kind === "ok") {
    return result.result.map((item) => userMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateProfileAsync = createAsyncThunk<
  Profile,
  ProfileCreation,
  ReduxThunk.RejectValue<HttpError<ProfileCreationDto> | null>
>("auth/update-profile", async (param, { rejectWithValue, dispatch }) => {
  const paramDto = profileMapper.toFormData(param);
  const result = await UserApi.updateProfile(paramDto);
  if (result.kind === "ok") {
    dispatch(getUsersAsync());
    const profileModel = profileMapper.fromDto(result.result);
    dispatch(updateCurrentUser(profileModel));
    return profileModel;
  }
  if (result.kind === "bad-data") {
    const errorBadData = profileMapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(errorBadData);
  }

  return rejectWithValue(null);
});

export const changePasswordAsync = createAsyncThunk<
  true,
  ChangePassword,
  ReduxThunk.RejectValue<HttpError<ChangePassword>>
>("auth/change-password", async (payload, { rejectWithValue }) => {
  const changePasswordDto = changePasswordMapper.toDto(payload);
  const result = await UserApi.changePassword(changePasswordDto);
  if (result.kind === "ok") {
    return true;
  }
  return ErrorHandler.catchHttpError(
    changePasswordMapper,
    result,
    rejectWithValue,
    false
  );
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload);
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        userAdapter.removeOne(state, action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        userAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload.payload,
        });
      })

      .addCase(getUsersAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.pending = false;
        userAdapter.setAll(state, action.payload);
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.pending = false;
        userAdapter.setAll(state, []);
      });
  },
});
export const userSelectors = userAdapter.getSelectors(
  (state: RootState) => state.user
);
export const userStore = (state: RootState) => state.user;
export default userSlice.reducer;
