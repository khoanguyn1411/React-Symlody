import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Api,
  MemberApi,
  RequestCreateMembersResult,
  RequestGetMembersResult,
} from "@/api";
import { RootState } from "@/features/store";
import { IMember, IMemberPost } from "@/features/types/member-type";

export type MemberState = {
  pending: boolean;
  members: IMember[];
};

const initialState: MemberState = {
  pending: false,
  members: [],
};

export const createMemberAsync = createAsyncThunk(
  "auth/login",
  async (payload: IMemberPost) => {
    const result: RequestCreateMembersResult = await MemberApi.createMember(
      payload
    );

    if (result.kind === "ok") {
      return true;
    }
    return false;
  }
);

export const getMembersAsync = createAsyncThunk("get/members", async () => {
  const result: RequestGetMembersResult = await MemberApi.getMembers();
  if (result.kind === "ok") {
    return result.result;
  }

  return [];
});

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMembersAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMembersAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.members = action.payload;
      })
      .addCase(getMembersAsync.rejected, (state) => {
        state.pending = false;
        state.members = [];
      });
  },
});

export const memberStore = (state: RootState) => state.member;

export default memberSlice.reducer;
