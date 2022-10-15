import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  MemberApi,
  RequestCreateMembersResult,
  RequestGetMembersResult,
  RequestUpdateMembersResult,
} from "@/api";
import { RootState, store } from "@/features/store";
import { MemberMapper, UserMapper } from "@/features/types/mappers";
import { IMember, IMemberCreateUpdate } from "@/features/types/models";
import { TMemberParamQueryDto } from "@/features/types/queries";
import { FilterService, GeneratorService, GlobalTypes } from "@/utils";

import { userAdapter } from "../user-reducer/state";
import { initialState, memberAdapter } from "./state";

export const createMemberAsync = createAsyncThunk<
  IMember,
  IMemberCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<any>
>("create/member", async (payload, { rejectWithValue }) => {
  const result: RequestCreateMembersResult = await MemberApi.createMember(
    MemberMapper.toCreateDto(payload)
  );
  if (result.kind === "ok") {
    return MemberMapper.fromDto(result.result);
  }
  return rejectWithValue(result.result);
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
  const result: RequestGetMembersResult = await MemberApi.getMembers(param);
  if (result.kind === "ok") {
    return result.result.map((item) => MemberMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  GlobalTypes.ReduxThunkRestoreResult<IMember>,
  GlobalTypes.ReduxThunkRestorePayload<IMemberCreateUpdate, IMember>,
  GlobalTypes.ReduxThunkRestoreRejected<any>
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
  return rejectWithValue({ result: result.result, isRestore });
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
        (item) =>
          FilterService.isTextIncludedIn(item.auth_account.full_name, search)
      );
      const listMemberAfterFilterByEmail = state.currentMemberList.filter(
        (item) =>
          FilterService.isTextIncludedIn(item.auth_account.email, search)
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
        const userState = store.getState().user;
        const newMember = action.payload;
        const newUser = UserMapper.fromMemberModel(newMember);
        userAdapter.addOne(userState, newUser);
        if (state.listQueryMember.is_archived !== true) {
          memberAdapter.addOne(state, newMember);
        }
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.pendingDeleteMember = true;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.pendingDeleteMember = false;

        const userState = store.getState().user;
        const removedId = action.payload;
        userAdapter.removeOne(userState, removedId);

        if (state.listQueryMember.is_archived == null) {
          memberAdapter.updateOne(state, {
            id: removedId,
            changes: { is_archived: true },
          });
          return;
        }

        memberAdapter.removeOne(state, removedId);
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

        const userState = store.getState().user;
        const newMember = action.payload.result;
        const newUser = UserMapper.fromMemberModel(newMember);

        if (action.payload.isRestore) {
          userAdapter.addOne(userState, newUser);
        }
        if (
          action.payload.isRestore &&
          state.listQueryMember.is_archived != null
        ) {
          memberAdapter.removeOne(state, newMember.id);
          return;
        }
        userAdapter.updateOne(userState, {
          id: newUser.id,
          changes: newUser,
        });
        memberAdapter.updateOne(state, {
          id: newMember.id,
          changes: newMember,
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
