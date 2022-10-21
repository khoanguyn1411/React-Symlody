import { createEntityAdapter } from "@reduxjs/toolkit";

import { IDepartment } from "@/features/types";

export interface DepartmentStateInner {
  pending: boolean;

  // Used for pagination and searching in front-end.
  departments: IDepartment[];
  department: IDepartment;
}

export const departmentAdapter = createEntityAdapter<IDepartment>({
  selectId: (member) => member.id,
});

export const initialState =
  departmentAdapter.getInitialState<DepartmentStateInner>({
    pending: false,

    departments: [],
    department: null,
  });

export type DepartmentState = typeof initialState;
