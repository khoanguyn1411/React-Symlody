import { createEntityAdapter } from "@reduxjs/toolkit";

import { ErrorResponse, ProfileCreation, User } from "@/features/types";
import { ChangePassword } from "@/features/types/models/change-password";

export interface UserStateInner {
  pending: boolean;
  errorsUpdateProfile: ErrorResponse<ProfileCreation>;
  errorsChangePassword: ErrorResponse<ChangePassword>;
}

export const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const initialState = userAdapter.getInitialState<UserStateInner>({
  pending: true,
  errorsUpdateProfile: null,
  errorsChangePassword: null,
});
