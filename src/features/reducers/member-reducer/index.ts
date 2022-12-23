import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  fileUploadedMapper,
  memberMapper,
  profileMapper,
} from "@/features/types/mappers";
import { memberFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import {
  FileUploaded,
  HttpError,
  Member,
  MemberCreation,
} from "@/features/types/models";
import { MemberFilterParams } from "@/features/types/models/filter-params";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { ReduxThunk } from "@/utils/types";

import { updateCurrentUser } from "../auth-reducer";
import { getUsersAsync, removeUser, userSelectors } from "../user-reducer";
import { initialState, memberAdapter } from "./state";

export const uploadMemberExcelFileAsync = createAsyncThunk<
  any,
  FileUploaded,
  ReduxThunk.RejectValue<false>
>("member/create-multiple", async (payload, { rejectWithValue, dispatch }) => {
  const formData = fileUploadedMapper.toFormData(payload);
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
  ReduxThunk.RejectValue<HttpError<MemberCreation, "authAccount">>
>("member/create", async (payload, { rejectWithValue, dispatch }) => {
  const memberDto = memberMapper.toCreationDto(payload);
  const result = await MemberApi.createMember(memberDto);
  if (result.kind === "ok") {
    dispatch(getUsersAsync());
    return memberMapper.fromDto(result.result);
  }
  return ErrorHandler.catchHttpError(memberMapper, result, rejectWithValue);
});

export const deleteMemberAsync = createAsyncThunk<
  Member["id"],
  Member["id"],
  ReduxThunk.RejectValue<null>
>("member/archive", async (id, { rejectWithValue, dispatch }) => {
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
  ReduxThunk.RejectValue<[]>
>("member/get-list", async (param, { rejectWithValue, dispatch }) => {
  const filterParamsDto = memberFilterParamsMapper.toDto(param);
  const result = await MemberApi.getMembers(filterParamsDto);
  if (result.kind === "ok") {
    const memberList = result.result.map((item) => memberMapper.fromDto(item));
    dispatch(setCurrentMemberList(memberList));
    return memberList;
  }
  return rejectWithValue([]);
});

export const updateMemberAsync = createAsyncThunk<
  ReduxThunk.RestoreResult<Member>,
  ReduxThunk.RestorePayload<MemberCreation, Member>,
  ReduxThunk.RejectValue<HttpError<MemberCreation, "authAccount">>
>(
  "member/update",
  async ({ payload, id, isRestore }, { rejectWithValue, dispatch }) => {
    const memberDto = memberMapper.toCreationDto(payload);
    const result = await MemberApi.updateMember(id, memberDto);
    if (result.kind === "ok") {
      const memberUpdatedInfo = memberMapper.fromDto(result.result);
      dispatch(getUsersAsync());
      const reduxStore = store.getState();
      const currentUser = reduxStore.auth.user;
      if (reduxStore.auth.user.memberId === id) {
        const profileModel = profileMapper.fromMember(
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
    return ErrorHandler.catchHttpError(memberMapper, result, rejectWithValue);
  }
);

export const setMemberFilterParams = createAsyncThunk<
  void,
  Partial<MemberFilterParams>
>("member/set-filter-params", async (params, { dispatch }) => {
  const reduxStore = store.getState();
  const currentMemberParams = reduxStore.member.filterParamsMember;
  dispatch(_setMemberFilterParams({ ...currentMemberParams, ...params }));
});

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    _setMemberFilterParams(state, action: PayloadAction<MemberFilterParams>) {
      state.filterParamsMember = action.payload;
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
        if (state.filterParamsMember.isArchived !== true) {
          memberAdapter.addOne(state, newMember);
        }
      })

      .addCase(deleteMemberAsync.pending, (state) => {
        state.pendingDeleteMember = true;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.pendingDeleteMember = false;
        const removedId = action.payload;
        if (state.filterParamsMember.isArchived == null) {
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
          action.payload.isRestore &&
          state.filterParamsMember.isArchived != null;
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
  _setMemberFilterParams,
  setMemberListWithPagination,
  setCurrentMemberList,
} = memberSlice.actions;

export default memberSlice.reducer;
