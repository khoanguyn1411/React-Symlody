import { createEntityAdapter } from "@reduxjs/toolkit";

import { ITask, IUser } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

export interface TaskStateInner {
  pending: boolean;
  listQueryTask: TTaskParamQueryDto;
  listTasksByAssignee: ITask[];
  selectedMemberList: IUser[] | null;
}

export const taskAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
  selectedMemberList: null,
  listQueryTask: {},
  listTasksByAssignee: [],
});

export type TaskState = typeof initialState;
