import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState } from "@/features/store";
import { ITask, IUser, TaskMapper } from "@/features/types";
import { ITaskCreateUpdate } from "@/features/types/models/task";
import { TTaskParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";

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
  ITask,
  ITaskCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/task", async (body, { rejectWithValue }) => {
  const taskDto = TaskMapper.toDto(body);
  const result = await TaskApi.createTask(taskDto);
  if (result.kind === "ok") {
    return TaskMapper.fromDto(result.result);
  }
  return rejectWithValue(null);
});

export const updateTaskAsync = createAsyncThunk<
  ITask,
  { id: ITask["id"]; payload: ITaskCreateUpdate },
  GlobalTypes.ReduxThunkRejectValue<null>
>("update/task", async ({ id, payload }, { rejectWithValue }) => {
  const taskDto = TaskMapper.toDto(payload);
  const result = await TaskApi.updateTask(id, taskDto);
  if (result.kind === "ok") {
    return TaskMapper.fromDto(result.result);
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
      state.selectedMemberList = action.payload;
    },
    getTasksByAssignee(
      state,
      action: PayloadAction<{ taskList: ITask[]; userList: IUser[] }>
    ) {
      const { taskList, userList } = action.payload;
      if (state.selectedMemberList === null) {
        state.listTasksByAssignee = taskList;
        return;
      }
      const selectedMemberEmailList = state.selectedMemberList.map(
        (member) => member.email
      );
      if (selectedMemberEmailList.length === 0) {
        state.listTasksByAssignee = taskList;
        return;
      }
      state.listTasksByAssignee = taskList.filter((task) => {
        const taskEmail = userList.find((user) => user.id === task.assignee.id);
        if (taskEmail) {
          return selectedMemberEmailList.includes(taskEmail.email);
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
        taskAdapter.addOne(state, action.payload);
      })

      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        taskAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
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
