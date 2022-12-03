import { createEntityAdapter } from "@reduxjs/toolkit";

import { Department } from "@/features/types";

export interface DepartmentStateInner {
  pending: boolean;
}

export const departmentAdapter = createEntityAdapter<Department>({
  selectId: (department) => department.id,
});

export const initialState =
  departmentAdapter.getInitialState<DepartmentStateInner>({
    pending: false,
  });

export type DepartmentState = typeof initialState;
