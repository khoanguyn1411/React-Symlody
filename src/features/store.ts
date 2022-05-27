import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth-reducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
