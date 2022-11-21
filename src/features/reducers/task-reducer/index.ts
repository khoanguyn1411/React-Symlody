import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState, store } from "@/features/store";
import { ITask, IUser, TaskMapper } from "@/features/types";
import { ITaskCreateUpdate } from "@/features/types/models/task";
import { TTaskParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";
import { generateArrayWithNoDuplicate } from "@/utils/services/generate-service";

import { userSelectors } from "../user-reducer";
import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  ITask[],
  TTaskParamQueryDto,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/tasks", async (param, { rejectWithValue }) => {
  const result = await TaskApi.getTasks(param);
  if (result.kind === "ok") {
    return result.result.map((item) => TaskMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const createTaskAsync = createAsyncThunk<
  { task: ITask; shouldAddOne: boolean },
  { task: ITaskCreateUpdate },
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/task", async (body, { rejectWithValue }) => {
  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === body.task.assignee.id);
  const currentDepartmentId = reduxStore.task.listQueryTask.department_id;

  // TODO: Add check not in the same department.
  // const isNotInSameDepartment =

  const taskDto = TaskMapper.toDto(body.task);
  const result = await TaskApi.createTask(taskDto);
  if (result.kind === "ok") {
    return {
      task: TaskMapper.fromDto(result.result),
      shouldAddOne: true,
    };
  }
  return rejectWithValue(null);
});

export const updateTaskAsync = createAsyncThunk<
  {
    task: ITask;
    shouldRemoveOne: boolean;
  },
  {
    id: ITask["id"];
    payload: ITaskCreateUpdate;
  },
  GlobalTypes.ReduxThunkRejectValue<null>
>("update/task", async ({ id, payload }, { rejectWithValue }) => {
  const taskDto = TaskMapper.toDto(payload);
  const result = await TaskApi.updateTask(id, taskDto);

  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === payload.assignee.id);
  const currentDepartmentId = reduxStore.task.listQueryTask.department_id;

  // TODO: Add check not in the same department.
  // const isNotInSameDepartment =
  if (result.kind === "ok") {
    return {
      task: TaskMapper.fromDto(result.result),
      shouldRemoveOne: false,
    };
  }
  return rejectWithValue(null);
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setListQueryTask(state, action: PayloadAction<TTaskParamQueryDto>) {
      state.listQueryTask = action.payload;
    },
    setSelectedMemberList(state, action: PayloadAction<IUser[] | null>) {
      state.listQueryTask = {
        ...state.listQueryTask,
        selected_member_list: action.payload,
      };
    },
    getTasksByAssignee(
      state,
      action: PayloadAction<{ taskList: ITask[]; userList: IUser[] }>
    ) {
      const { taskList, userList } = action.payload;
      if (state.listQueryTask.selected_member_list === null) {
        state.listTasksByAssignee = taskList;
        return;
      }

      const selectedMemberIdsList =
        state.listQueryTask.selected_member_list?.map((member) => member.id);

      if (selectedMemberIdsList.length === 0) {
        state.listTasksByAssignee = taskList;
        return;
      }
      state.listTasksByAssignee = taskList.filter((task) => {
        const taskInfo = userList.find((user) => user.id === task.assignee.id);
        if (taskInfo) {
          return selectedMemberIdsList.includes(taskInfo.id);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.pending = false;
        taskAdapter.setAll(state, action.payload);
      })
      .addCase(getTasksAsync.rejected, (state) => {
        state.pending = false;
        taskAdapter.setAll(state, []);
      })

      .addCase(createTaskAsync.fulfilled, (state, action) => {
        const { task: newTask, shouldAddOne } = action.payload;
        if (!shouldAddOne) {
          return;
        }
        taskAdapter.addOne(state, newTask);
      })

      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const { task: newTask, shouldRemoveOne } = action.payload;
        if (shouldRemoveOne) {
          taskAdapter.removeOne(state, newTask.id);
          return;
        }
        taskAdapter.updateOne(state, {
          id: newTask.id,
          changes: newTask,
        });
      });
  },
});
export const taskSelectors = taskAdapter.getSelectors(
  (state: RootState) => state.task
);
export const taskStore = (state: RootState) => state.task;
export const { setListQueryTask, setSelectedMemberList, getTasksByAssignee } =
  taskSlice.actions;

export default taskSlice.reducer;
