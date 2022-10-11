import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserApi } from "@/api";
import { RootState } from "@/features/store";
import { IUser, UserMapper } from "@/features/types";
import { GlobalTypes } from "@/utils";

import { initialState, userAdapter } from "./state";

export const getUsersAsync = createAsyncThunk<
  IUser[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/users", async (param, { rejectWithValue }) => {
  const result = await UserApi.getUsers();
  if (result.kind === "ok") {
    return result.result.map((item) => UserMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
