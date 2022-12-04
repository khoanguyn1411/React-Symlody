import { createEntityAdapter } from "@reduxjs/toolkit";

import { Task } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

export interface TaskStateInner {
  pending: boolean;
  pendingDeleteTask: boolean;
  listQueryTask: TTaskParamQueryDto;
  listTasksByAssignee: Task[];
}

export const taskAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
  pendingDeleteTask: false,
  listQueryTask: { selected_member_list: [] },
  listTasksByAssignee: [],
});

export type TaskState = typeof initialState;
