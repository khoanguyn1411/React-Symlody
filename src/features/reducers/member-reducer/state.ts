import { createEntityAdapter } from "@reduxjs/toolkit";

import { APP_PAGINATION } from "@/constants";
import { Member } from "@/features/types";
import { MemberFilterParams } from "@/features/types/models/filter-params";

export interface MemberStateInner {
  pending: boolean;
  pendingRestoreMember: boolean;
  pendingDeleteMember: boolean;
  pendingUploadFileMember: boolean;
  listQueryMember: MemberFilterParams;

  // Used for pagination and searching in front-end.
  currentMemberList: Member[];
  memberListPagination: Member[];
}

export const memberAdapter = createEntityAdapter<Member>({
  selectId: (member) => member.id,
});

export const initialState = memberAdapter.getInitialState<MemberStateInner>({
  pending: false,
  pendingDeleteMember: false,
  pendingRestoreMember: false,
  pendingUploadFileMember: false,
  listQueryMember: {
    isArchived: false,
    page: 1,
    limit: APP_PAGINATION.DEFAULT_PAGINATION_LIMIT,
    search: "",
  },

  // Used for pagination and searching in front-end.
  currentMemberList: [],
  memberListPagination: [],
});

export type MemberState = typeof initialState;
