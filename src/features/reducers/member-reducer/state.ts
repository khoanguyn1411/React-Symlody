import { createEntityAdapter } from "@reduxjs/toolkit";

import { IMember } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";

export interface MemberStateInner {
  pending: boolean;
  pendingCreateMember: boolean;
  pendingDeleteMember: boolean;
  pendingUpdateMember: boolean;
  listQueryMember: TMemberParamQueryDto;
}

export const memberAdapter = createEntityAdapter<IMember>({
  selectId: (member) => member.id,
});

export const initialState = memberAdapter.getInitialState<MemberStateInner>({
  pending: false,
  pendingCreateMember: false,
  pendingDeleteMember: false,
  pendingUpdateMember: false,
  listQueryMember: { is_archived: false },
});

export type MemberState = typeof initialState;
