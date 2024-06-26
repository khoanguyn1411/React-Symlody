import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserApi } from "@/api";
import { RootState } from "@/features/store";
import {
  ErrorResponse,
  Profile,
  ProfileCreation,
  ProfileCreationDto,
  profileMapper,
  User,
  userMapper,
} from "@/features/types";
import { changePasswordMapper } from "@/features/types/mappers/change-password.mapper";
import { userFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers/user-filter-params.mapper";
import { ChangePassword } from "@/features/types/models/change-password";
import { UserFilterParams } from "@/features/types/models/filter-params/user-filter-param";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
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
  UserFilterParams | null,
  ReduxThunk.RejectValue<[]>
>("user/get-list", async (params, { rejectWithValue }) => {
  const paramDto = userFilterParamsMapper.toDto(params);
  const result = await UserApi.getUsers(paramDto);
  if (result.kind === "ok") {
    return result.result_dto.map((item) => userMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateProfileAsync = createAsyncThunk<
  Profile,
  ProfileCreation,
  ReduxThunk.RejectValue<ErrorResponse<ProfileCreationDto> | null>
>("auth/update-profile", async (param, { rejectWithValue, dispatch }) => {
  const paramDto = profileMapper.toFormData(param);
  const result = await UserApi.updateProfile(paramDto);
  if (result.kind === "ok") {
    const profileModel = profileMapper.fromDto(result.result_dto);
    dispatch(updateCurrentUser(profileModel));
    return profileModel;
  }
  return ErrorHandler.catchErrors({
    rejectWithValue,
    mapper: profileMapper,
    result,
  });
});

export const changePasswordAsync = createAsyncThunk<
  unknown,
  ChangePassword,
  ReduxThunk.RejectValue<ErrorResponse<ChangePassword>>
>("auth/change-password", async (payload, { rejectWithValue }) => {
  const changePasswordDto = changePasswordMapper.toDto(payload);
  const result = await UserApi.changePassword(changePasswordDto);
  return validateSimpleRequestResult({
    rejectWithValue,
    mapper: changePasswordMapper,
    result,
  });
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
