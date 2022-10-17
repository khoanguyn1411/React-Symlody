import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth-reducer";
import commonReducer from "./reducers/common-reducer";
import departmentReducer from "./reducers/department-reducer";
import memberReducer from "./reducers/member-reducer";
import propertyReducer from "./reducers/property-reducer";
import taskReducer from "./reducers/task-reducer";
import userReducer from "./reducers/user-reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    common: commonReducer,
    member: memberReducer,
    department: departmentReducer,
    property: propertyReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // We need to disable this check to allow ES6 classes in Redux.
      // You can find more info about this middleware in docs:
      // https://redux-toolkit.js.org/api/serializabilityMiddleware
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
