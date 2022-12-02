import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  FileUploadedMapper,
  MemberMapper,
  ProfileMapper,
} from "@/features/types/mappers";
import {
  HttpError,
  IFileUploaded,
  IMember,
  IMemberCreateUpdate,
} from "@/features/types/models";
import { TMemberParamQueryDto } from "@/features/types/queries";
import { FilterService, GeneratorService, GlobalTypes } from "@/utils";

import { updateCurrentUser } from "../auth-reducer";
import { getUsersAsync, removeUser, userSelectors } from "../user-reducer";
import { initialState, memberAdapter } from "./state";

export const uploadMemberExcelFileAsync = createAsyncThunk<
  any,
  IFileUploaded,
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
  IMember,
  IMemberCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<HttpError<IMemberCreateUpdate> | null>
>("create/member", async (payload, { rejectWithValue, dispatch }) => {
  const memberDto = MemberMapper.toCreateDto(payload);
  const result = await MemberApi.createMember(memberDto);
  console.log(result);
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
  IMember["id"],
  IMember["id"],
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
        .find((item) => item.email === deletedMember.auth_account.email);
      if (deletedUser != null) {
        dispatch(removeUser(deletedUser.id));
      }
    }
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
  if (result.kind === "ok") {
    return result.result.map((item) => MemberMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  GlobalTypes.ReduxThunkRestoreResult<IMember>,
  GlobalTypes.ReduxThunkRestorePayload<IMemberCreateUpdate, IMember>,
  GlobalTypes.ReduxThunkRestoreRejected<unknown>
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
      if (reduxStore.auth.user.profile_id === id) {
        const profileModel = ProfileMapper.fromMemberModel(
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
      return rejectWithValue({ result: errorBadData, isRestore: false });
    }
    return rejectWithValue({ result: result.result, isRestore });
  }
);

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
        const newMember = action.payload;
        if (state.listQueryMember.is_archived !== true) {
          memberAdapter.addOne(state, newMember);
        }
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.pendingDeleteMember = true;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.pendingDeleteMember = false;
        const removedId = action.payload;
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
        const newMember = action.payload.result;
        const shouldRemoveOne =
          action.payload.isRestore && state.listQueryMember.is_archived != null;
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
export const { setListQueryMember, getPaginationMember } = memberSlice.actions;

export default memberSlice.reducer;
