import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberApi } from "@/api";
import { RootState } from "@/features/store";
import { MemberMapper } from "@/features/types/mappers";
import { IMember, IMemberCreateUpdate } from "@/features/types/models";
import { TMemberParamQueryDto } from "@/features/types/queries";
import { FilterService, GeneratorService, GlobalTypes } from "@/utils";

import { initialState, memberAdapter } from "./state";

export const createMemberAsync = createAsyncThunk<
  IMember,
  IMemberCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/member", async (payload, { rejectWithValue }) => {
  const result = await MemberApi.createMember(
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
  GlobalTypes.ReduxThunkRejectValue<null>
>("delete/member", async (id, { rejectWithValue }) => {
  const result = await MemberApi.deleteMember(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const getMembersAsync = createAsyncThunk<
  IMember[],
  TMemberParamQueryDto,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/members", async (param, { rejectWithValue }) => {
  const result = await MemberApi.getMembers(param);
  console.log(result);
  if (result.kind === "ok") {
    return result.result.map((item) => MemberMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  GlobalTypes.ReduxThunkRestoreResult<IMember>,
  GlobalTypes.ReduxThunkRestorePayload<IMemberCreateUpdate, IMember>,
  GlobalTypes.ReduxThunkRestoreRejected
>("update/member", async ({ payload, id, isRestore }, { rejectWithValue }) => {
  const result = await MemberApi.updateMember(
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
    getPaginationMember(
      state,
      action: PayloadAction<
        GlobalTypes.StrictOmit<TMemberParamQueryDto, "is_archived"> & {
          memberList?: IMember[];
        }
      >
    ) {
      const { memberList, ...rest } = action.payload;
      if (memberList) {
        state.currentMemberList = memberList;
      }
      state.listQueryMemberFE = { ...state.listQueryMemberFE, ...rest };
      const { limit, page, search } = state.listQueryMemberFE;
      const memberListPagination = state.currentMemberList.slice(
        (page - 1) * limit,
        page * limit
      );
      if (!search) {
        if (memberList) {
          state.currentMemberList = memberList;
        }
        state.memberListPagination = memberListPagination;
        return;
      }
      const listMemberAfterFilterByName = state.currentMemberList.filter(
        (item) => FilterService.fromText(item.auth_account.full_name, search)
      );
      const listMemberAfterFilterByEmail = state.currentMemberList.filter(
        (item) => FilterService.fromText(item.auth_account.email, search)
      );

      const newMemberList = GeneratorService.generateArrayWithNoDuplicate(
        listMemberAfterFilterByName.concat(listMemberAfterFilterByEmail)
      );
      state.currentMemberList = newMemberList;
      state.memberListPagination = newMemberList.slice(
        (page - 1) * limit,
        page * limit
      );
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
        state.pendingDeleteMember = false;
        if (state.listQueryMember.is_archived == null) {
          memberAdapter.updateOne(state, {
            id: action.payload,
            changes: { is_archived: true },
          });
          return;
        }
        memberAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteMemberAsync.rejected, (state) => {
        state.pendingDeleteMember = false;
      })
      .addCase(updateMemberAsync.rejected, (state) => {
        state.pendingRestoreMember = false;
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
export const { setListQueryMember, getPaginationMember } = memberSlice.actions;

export default memberSlice.reducer;
