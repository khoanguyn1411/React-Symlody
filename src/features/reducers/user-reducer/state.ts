import { createEntityAdapter } from "@reduxjs/toolkit";

import { IUser } from "@/features/types";

export interface UserStateInner {
  pending: boolean;
}

export const userAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user.id,
});

export const initialState = userAdapter.getInitialState<UserStateInner>({
  pending: false,
});

export type UserState = typeof initialState;
