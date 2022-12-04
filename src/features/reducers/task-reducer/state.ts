import { createEntityAdapter } from "@reduxjs/toolkit";

import { Task } from "@/features/types";
import { TaskFilterParams } from "@/features/types/models/filter-params";

export interface TaskStateInner {
  pending: boolean;
  pendingDeleteTask: boolean;
  listQueryTask: TaskFilterParams;
  currentListTask: Task[];
}

export const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
  pendingDeleteTask: false,
  listQueryTask: { departmentId: null, selectedMemberList: [] },
  currentListTask: [],
});

export type TaskState = typeof initialState;
