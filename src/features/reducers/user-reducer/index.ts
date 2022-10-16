import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserApi } from "@/api";
import { RootState } from "@/features/store";
import { IUser, UserMapper } from "@/features/types";
import { GlobalTypes } from "@/utils";
import { StrictOmit } from "@/utils/types";

import { initialState, userAdapter } from "./state";

export const addUser = createAsyncThunk("user/add", (user: IUser) => user);
export const updateUser = createAsyncThunk(
  "user/update",
  (param: { id: IUser["id"]; payload: StrictOmit<IUser, "id"> }) => param
);
export const removeUser = createAsyncThunk(
  "user/remove",
  (id: IUser["id"]) => id
);

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
