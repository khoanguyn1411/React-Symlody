import { createEntityAdapter } from "@reduxjs/toolkit";

import { ITask } from "@/features/types";

export interface TaskStateInner {
  pending: boolean;
}

export const taskAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
});

export type TaskState = typeof initialState;
