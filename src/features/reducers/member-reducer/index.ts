import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  MemberApi,
  RequestCreateMembersResult,
  RequestGetMembersResult,
} from "@/api";
import { RootState } from "@/features/store";
import { MemberMapper } from "@/features/types/mappers";
import { IMember, IMemberCU } from "@/features/types/models";

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
  async (payload: IMemberCU) => {
    const result: RequestCreateMembersResult = await MemberApi.createMember(
      MemberMapper.toDto(payload)
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
    return result.result.map((item) => MemberMapper.fromDto(item));
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
