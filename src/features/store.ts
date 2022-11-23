import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  StateFromReducersMapObject,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Reducer } from "react";

import authReducer from "./reducers/auth-reducer";
import commonReducer from "./reducers/common-reducer";
import configReducer from "./reducers/config-reducer";
import departmentReducer from "./reducers/department-reducer";
import memberReducer from "./reducers/member-reducer";
import propertyReducer from "./reducers/property-reducer";
import taskReducer from "./reducers/task-reducer";
import userReducer from "./reducers/user-reducer";

const reducers = {
  auth: authReducer,
  user: userReducer,
  common: commonReducer,
  member: memberReducer,
  department: departmentReducer,
  property: propertyReducer,
  task: taskReducer,
  config: configReducer,
};

const rootReducer = combineReducers(reducers);

const reducerProxy: Reducer<
  StateFromReducersMapObject<typeof reducers> | undefined,
  AnyAction
> = (state, action) => {
  if (action.type === "auth/logout") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
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
