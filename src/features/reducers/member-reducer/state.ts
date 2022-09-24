import { createEntityAdapter } from "@reduxjs/toolkit";

import { IMember } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";

export interface MemberStateInner {
  pending: boolean;
  pendingRestoreMember: boolean;
  pendingDeleteMember: boolean;
  memberListPagination: IMember[];
  listQueryMember: TMemberParamQueryDto;
}

export const memberAdapter = createEntityAdapter<IMember>({
  selectId: (member) => member.id,
});

export const initialState = memberAdapter.getInitialState<MemberStateInner>({
  pending: false,
  pendingDeleteMember: false,
  pendingRestoreMember: false,
  memberListPagination: [],
  listQueryMember: { is_archived: false },
});

export type MemberState = typeof initialState;
