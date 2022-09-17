import { createEntityAdapter } from "@reduxjs/toolkit";

import { IMember } from "@/features/types";
import { TMemberParamQueryDto } from "@/features/types/queries";

export interface MemberStateInner {
  pending: boolean;
  pendingDeleteMember: boolean;
  listQueryMember: TMemberParamQueryDto;
}

export const memberAdapter = createEntityAdapter<IMember>({
  selectId: (member) => member.id,
});

export const initialState = memberAdapter.getInitialState<MemberStateInner>({
  pending: false,
  pendingDeleteMember: false,
  listQueryMember: { is_archived: false },
});

export type MemberState = typeof initialState;
