import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth-reducer";
import commonReducer from "./reducers/common-reducer";
import departmentReducer from "./reducers/department-reducer";
import memberReducer from "./reducers/member-reducer";
import propertyReducer from "./reducers/property-reducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    common: commonReducer,
    member: memberReducer,
    department: departmentReducer,
    property: propertyReducer,
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
