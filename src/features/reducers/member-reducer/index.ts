import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  MemberApi,
  RequestCreateMembersResult,
  RequestDeleteMembersResult,
  RequestGetMembersResult,
  RequestUpdateMembersResult,
} from "@/api";
import { RootState } from "@/features/store";
import { MemberMapper } from "@/features/types/mappers";
import { IMember, IMemberCreate, IMemberUpdate } from "@/features/types/models";
import { TMemberParamQueryDto } from "@/features/types/queries";

import { initialState, memberAdapter } from "./state";

export const createMemberAsync = createAsyncThunk<
  IMember,
  IMemberCreate,
  { rejectValue: null }
>("create/member", async (payload, { rejectWithValue }) => {
  const result: RequestCreateMembersResult = await MemberApi.createMember(
    MemberMapper.toCreateDto(payload)
  );
  if (result.kind === "ok") {
    return MemberMapper.fromDto(result.result);
  }
  return rejectWithValue(null);
});

export const deleteMemberAsync = createAsyncThunk<
  IMember["id"],
  IMember["id"],
  { rejectValue: null }
>("delete/member", async (id, { rejectWithValue }) => {
  const result: RequestDeleteMembersResult = await MemberApi.deleteMember(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const getMembersAsync = createAsyncThunk<
  IMember[],
  TMemberParamQueryDto,
  { rejectValue: [] }
>("get/members", async (param, { rejectWithValue }) => {
  const result: RequestGetMembersResult = await MemberApi.getMembers(param);
  if (result.kind === "ok") {
    return result.result.map((item) => MemberMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  {
    result: IMember;
    isRestore: boolean;
  },
  {
    payload: IMemberUpdate;
    id: IMember["id"];
    isRestore: boolean;
  },
  {
    rejectValue: {
      result: null;
      isRestore: boolean;
    };
  }
>("update/member", async ({ payload, id, isRestore }, { rejectWithValue }) => {
  const result: RequestUpdateMembersResult = await MemberApi.updateMember(
    id,
    MemberMapper.toUpdateDto(payload)
  );
  if (result.kind === "ok") {
    return {
      result: MemberMapper.fromDto(result.result),
      isRestore,
    };
  }
  return rejectWithValue({ result: null, isRestore });
});

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
      .addCase(createMemberAsync.fulfilled, (state, action) => {
        if (state.listQueryMember.is_archived !== true) {
          memberAdapter.addOne(state, action.payload);
        }
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
        state.pendingRestoreMember = true;
      })
      .addCase(updateMemberAsync.fulfilled, (state, action) => {
        state.pendingRestoreMember = false;
        if (
          action.payload.isRestore &&
          state.listQueryMember.is_archived != null
        ) {
          memberAdapter.removeOne(state, action.payload.result.id);
          return;
        }
        memberAdapter.updateOne(state, {
          id: action.payload.result.id,
          changes: action.payload.result,
        });
      });
  },
});

export const memberStore = (state: RootState) => state.member;
export const memberSelectors = memberAdapter.getSelectors(
  (state: RootState) => state.member
);
export const { setListQueryMember } = memberSlice.actions;

export default memberSlice.reducer;
