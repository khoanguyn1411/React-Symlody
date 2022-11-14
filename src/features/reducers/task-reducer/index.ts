import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState } from "@/features/store";
import { IMember, ITask, TaskMapper } from "@/features/types";
import { ITaskCreateUpdate } from "@/features/types/models/task";
import { GlobalTypes } from "@/utils";

import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  ITask[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/tasks", async (_, { rejectWithValue }) => {
  const result = await TaskApi.getTasks();
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
  reducers: {},
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
export default taskSlice.reducer;
