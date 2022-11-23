import { createEntityAdapter } from "@reduxjs/toolkit";

import { ITask } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

export interface TaskStateInner {
  pending: boolean;
  listQueryTask: TTaskParamQueryDto;
  listTasksByAssignee: ITask[];
}

export const taskAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
  listQueryTask: { selected_member_list: [] },
  listTasksByAssignee: [],
});

export type TaskState = typeof initialState;
