import { createEntityAdapter } from "@reduxjs/toolkit";

import { User } from "@/features/types";

export interface UserStateInner {
  pending: boolean;
}

export const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const initialState = userAdapter.getInitialState<UserStateInner>({
  pending: true,
});

export type UserState = typeof initialState;
