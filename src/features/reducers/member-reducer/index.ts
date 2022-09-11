import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  MemberApi,
  RequestCreateMembersResult,
  RequestDeleteMembersResult,
  RequestGetMembersResult,
} from "@/api";
import { RootState } from "@/features/store";
import { MemberMapper } from "@/features/types/mappers";
import { IMember, IMemberCreate, IMemberUpdate } from "@/features/types/models";
import { TMemberParamQueryDto } from "@/features/types/queries";

import { initialState, memberAdapter } from "./state";

export const createMemberAsync = createAsyncThunk(
  "create/member",
  async (payload: IMemberCreate) => {
    const result: RequestCreateMembersResult = await MemberApi.createMember(
      MemberMapper.toCreateDto(payload)
    );
    console.log(result);
    if (result.kind === "ok") {
      return MemberMapper.fromDto(result.result);
    }
    return null;
  }
);

export const deleteMemberAsync = createAsyncThunk(
  "delete/member",
  async (id: IMember["id"]) => {
    const result: RequestDeleteMembersResult = await MemberApi.deleteMember(id);
    if (result.kind === "ok") {
      return id;
    }
    return null;
  }
);

export const getMembersAsync = createAsyncThunk(
  "get/members",
  async (param: TMemberParamQueryDto) => {
    const result: RequestGetMembersResult = await MemberApi.getMembers(param);
    if (result.kind === "ok") {
      return result.result.map((item) => MemberMapper.fromDto(item));
    }
    return [];
  }
);

export const updateMemberAsync = createAsyncThunk(
  "update/member",
  async ({ payload, id }: { payload: IMemberUpdate; id: IMember["id"] }) => {
    const result: RequestCreateMembersResult = await MemberApi.updateMember(
      id,
      MemberMapper.toUpdateDto(payload)
    );
    if (result.kind === "ok") {
      return MemberMapper.fromDto(result.result);
    }
    return null;
  }
);

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setListQueryMember(state, action: PayloadAction<TMemberParamQueryDto>) {
      state.listQueryMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembersAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMembersAsync.fulfilled, (state, action) => {
        state.pending = false;
        memberAdapter.setAll(state, action.payload);
      })
      .addCase(getMembersAsync.rejected, (state) => {
        state.pending = false;
        memberAdapter.setAll(state, []);
      })
      .addCase(createMemberAsync.pending, (state) => {
        state.pendingCreateMember = true;
      })
      .addCase(createMemberAsync.fulfilled, (state, action) => {
        state.pendingCreateMember = false;
        memberAdapter.addOne(state, action.payload);
      })
      .addCase(createMemberAsync.rejected, (state) => {
        state.pendingCreateMember = false;
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.pendingDeleteMember = true;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        memberAdapter.removeOne(state, action.payload);
        state.pendingDeleteMember = false;
      })
      .addCase(deleteMemberAsync.rejected, (state) => {
        state.pendingDeleteMember = false;
      })
      .addCase(updateMemberAsync.pending, (state) => {
        state.pendingUpdateMember = true;
      })
      .addCase(updateMemberAsync.fulfilled, (state, action) => {
        memberAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        state.pendingUpdateMember = false;
      })
      .addCase(updateMemberAsync.rejected, (state) => {
        state.pendingUpdateMember = false;
      });
  },
});

export const memberStore = (state: RootState) => state.member;
export const memberSelectors = memberAdapter.getSelectors(
  (state: RootState) => state.member
);
export const { setListQueryMember } = memberSlice.actions;

export default memberSlice.reducer;
