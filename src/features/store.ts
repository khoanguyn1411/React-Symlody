import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth-reducer";
import commonReducer from "./reducers/common-reducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    common: commonReducer,
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
