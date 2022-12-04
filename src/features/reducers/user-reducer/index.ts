import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserApi } from "@/api";
import { RootState } from "@/features/store";
import { User, userMapper } from "@/features/types";
import { GlobalTypes } from "@/utils";
import { StrictOmit } from "@/utils/types";

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
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/users", async (_, { rejectWithValue }) => {
  const result = await UserApi.getUsers();
  if (result.kind === "ok") {
    return result.result.map((item) => userMapper.fromDto(item));
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
