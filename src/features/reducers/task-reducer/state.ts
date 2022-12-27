import { createEntityAdapter } from "@reduxjs/toolkit";

import { Task } from "@/features/types";
import { TaskFilterParams } from "@/features/types/models/filter-params";

export interface TaskStateInner {
  pending: boolean;
  pendingDeleteTask: boolean;
  filterParamsTask: TaskFilterParams;
  currentListTask: Task[];
}

export const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: true,
  pendingDeleteTask: false,
  filterParamsTask: { departmentId: null, selectedMemberList: [] },
  currentListTask: [],
});

export type TaskState = typeof initialState;
