import { createEntityAdapter } from "@reduxjs/toolkit";

import { APP_PAGINATION } from "@/constants";
import { IMember } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";

export interface MemberStateInner {
  pending: boolean;
  pendingRestoreMember: boolean;
  pendingDeleteMember: boolean;
  listQueryMember: TMemberParamQueryDto;

  // Used for pagination and searching in front-end.
  currentMemberList: IMember[];
  memberListPagination: IMember[];
  listQueryMemberFE: GlobalTypes.StrictOmit<
    TMemberParamQueryDto,
    "is_archived"
  >;
}

export const memberAdapter = createEntityAdapter<IMember>({
  selectId: (member) => member.id,
});

export const initialState = memberAdapter.getInitialState<MemberStateInner>({
  pending: false,
  pendingDeleteMember: false,
  pendingRestoreMember: false,
  listQueryMember: { is_archived: false },

  // Used for pagination and searching in front-end.
  currentMemberList: [],
  memberListPagination: [],
  listQueryMemberFE: {
    page: 1,
    limit: APP_PAGINATION.DEFAULT_PAGINATION_LIMIT,
    search: "",
  },
});

export type MemberState = typeof initialState;
