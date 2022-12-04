import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  FileUploadedMapper,
  MemberMapper,
  ProfileMapper,
} from "@/features/types/mappers";
import { MemberFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import {
  FileUploaded,
  HttpError,
  Member,
  MemberCreation,
} from "@/features/types/models";
import { MemberFilterParams } from "@/features/types/models/filter-params";
import { FilterService, GeneratorService, GlobalTypes } from "@/utils";

import { updateCurrentUser } from "../auth-reducer";
import { getUsersAsync, removeUser, userSelectors } from "../user-reducer";
import { initialState, memberAdapter } from "./state";

export const uploadMemberExcelFileAsync = createAsyncThunk<
  any,
  FileUploaded,
  GlobalTypes.ReduxThunkRejectValue<false>
>("createMultiples/member", async (payload, { rejectWithValue, dispatch }) => {
  const formData = FileUploadedMapper.toFormData(payload);
  const result = await MemberApi.uploadMemberExcelFile(formData);
  if (result.kind === "ok") {
    dispatch(getUsersAsync());
    return true;
  }
  return rejectWithValue(false);
});

export const createMemberAsync = createAsyncThunk<
  Member,
  MemberCreation,
  GlobalTypes.ReduxThunkRejectValue<HttpError<MemberCreation> | null>
>("create/member", async (payload, { rejectWithValue, dispatch }) => {
  const memberDto = MemberMapper.toCreateDto(payload);
  const result = await MemberApi.createMember(memberDto);
  if (result.kind === "ok") {
    dispatch(getUsersAsync());
    return MemberMapper.fromDto(result.result);
  }
  if (result.kind === "bad-data") {
    const errorBadData = MemberMapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(errorBadData);
  }
  return rejectWithValue(null);
});

export const deleteMemberAsync = createAsyncThunk<
  Member["id"],
  Member["id"],
  GlobalTypes.ReduxThunkRejectValue<null>
>("delete/member", async (id, { rejectWithValue, dispatch }) => {
  const result = await MemberApi.deleteMember(id);
  if (result.kind === "ok") {
    const reduxStore = store.getState();
    const userState = reduxStore.user;
    if (userState.ids.length > 0) {
      const deletedMember = memberSelectors.selectById(reduxStore, id);
      const deletedUser = userSelectors
        .selectAll(reduxStore)
        .find((item) => item.email === deletedMember.authAccount.email);
      if (deletedUser != null) {
        dispatch(removeUser(deletedUser.id));
      }
    }
    return id;
  }
  return rejectWithValue(null);
});

export const getMembersAsync = createAsyncThunk<
  Member[],
  MemberFilterParams,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/members", async (param, { rejectWithValue, dispatch }) => {
  const filterParamsDto = MemberFilterParamsMapper.toDto(param);
  const result = await MemberApi.getMembers(filterParamsDto);
  if (result.kind === "ok") {
    const memberList = result.result.map((item) => MemberMapper.fromDto(item));
    dispatch(setCurrentMemberList(memberList));
    return memberList;
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  GlobalTypes.ReduxThunkRestoreResult<Member>,
  GlobalTypes.ReduxThunkRestorePayload<MemberCreation, Member>,
  GlobalTypes.ReduxThunkRejectValue<HttpError<MemberCreation> | null>
>(
  "update/member",
  async ({ payload, id, isRestore }, { rejectWithValue, dispatch }) => {
    const memberDto = MemberMapper.toUpdateDto(payload);
    const result = await MemberApi.updateMember(id, memberDto);
    if (result.kind === "ok") {
      const memberUpdatedInfo = MemberMapper.fromDto(result.result);
      dispatch(getUsersAsync());
      const reduxStore = store.getState();
      const currentUser = reduxStore.auth.user;
      if (reduxStore.auth.user.memberId === id) {
        const profileModel = ProfileMapper.fromMember(
          currentUser,
          memberUpdatedInfo
        );
        dispatch(updateCurrentUser(profileModel));
      }
      return {
        result: memberUpdatedInfo,
        isRestore,
      };
    }
    if (result.kind === "bad-data") {
      const errorBadData = MemberMapper.httpErrorFromDto(result.httpError);
      return rejectWithValue(errorBadData);
    }
    return rejectWithValue(null);
  }
);

export const paginateMemberAsync = createAsyncThunk<void, undefined>(
  "paginate/members",
  async (_, { dispatch }) => {
    const reduxStore = store.getState();
    const memberState = reduxStore.member;
    const { currentMemberList } = memberState;
    const { page, limit } = memberState.listQueryMember;
    const memberListPagination = currentMemberList.slice(
      (page - 1) * limit,
      page * limit
    );
    dispatch(setMemberListWithPagination(memberListPagination));
  }
);

export const filterMemberBySearch = createAsyncThunk<void, string>(
  "paginate/members",
  async (search, { dispatch }) => {
    const reduxStore = store.getState();
    const memberState = reduxStore.member;
    const memberList = memberSelectors.selectAll(reduxStore);
    const { currentMemberList } = memberState;
    dispatch(setListQueryMember(search));
    if (!search) {
      dispatch(setCurrentMemberList(memberList));
      return;
    }
    const listMemberAfterFilterByName = currentMemberList.filter((item) =>
      FilterService.isTextIncludedIn(item.authAccount.fullName, search)
    );
    const listMemberAfterFilterByEmail = currentMemberList.filter((item) =>
      FilterService.isTextIncludedIn(item.authAccount.email, search)
    );

    const newMemberList = GeneratorService.generateArrayWithNoDuplicate(
      listMemberAfterFilterByName.concat(listMemberAfterFilterByEmail)
    );
    dispatch(setCurrentMemberList(newMemberList));
  }
);

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setListQueryMember(
      state,
      action: PayloadAction<Partial<MemberFilterParams>>
    ) {
      state.listQueryMember = { ...state.listQueryMember, ...action.payload };
    },
    setCurrentMemberList(state, action: PayloadAction<Member[]>) {
      state.currentMemberList = action.payload;
    },
    setMemberListWithPagination(state, action: PayloadAction<Member[]>) {
      state.memberListPagination = action.payload;
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
        const newMember = action.payload;
        if (state.listQueryMember.isArchived !== true) {
          memberAdapter.addOne(state, newMember);
        }
      })

      .addCase(deleteMemberAsync.pending, (state) => {
        state.pendingDeleteMember = true;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.pendingDeleteMember = false;
        const removedId = action.payload;
        if (state.listQueryMember.isArchived == null) {
          memberAdapter.updateOne(state, {
            id: removedId,
            changes: { isArchived: true },
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
        const newMember = action.payload.result;
        const shouldRemoveOne =
          action.payload.isRestore && state.listQueryMember.isArchived != null;
        if (shouldRemoveOne) {
          memberAdapter.removeOne(state, newMember.id);
          return;
        }

        memberAdapter.updateOne(state, {
          id: newMember.id,
          changes: newMember,
        });
      })

      .addCase(uploadMemberExcelFileAsync.pending, (state) => {
        state.pendingUploadFileMember = true;
      })
      .addCase(uploadMemberExcelFileAsync.fulfilled, (state) => {
        state.pendingUploadFileMember = false;
      })
      .addCase(uploadMemberExcelFileAsync.rejected, (state) => {
        state.pendingUploadFileMember = false;
      });
  },
});

export const memberStore = (state: RootState) => state.member;
export const memberSelectors = memberAdapter.getSelectors(
  (state: RootState) => state.member
);
export const {
  setListQueryMember,
  setMemberListWithPagination,
  setCurrentMemberList,
} = memberSlice.actions;

export default memberSlice.reducer;
