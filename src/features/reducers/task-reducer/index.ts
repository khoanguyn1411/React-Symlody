import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState } from "@/features/store";
import { ITask, TaskMapper } from "@/features/types";
import { GlobalTypes } from "@/utils";

import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  ITask[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/tasks", async (param, { rejectWithValue }) => {
  const result = await TaskApi.getTasks();
  if (result.kind === "ok") {
    return result.result.map((item) => TaskMapper.fromDto(item));
  }
  return rejectWithValue([]);
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
      });
  },
});
export const taskSelectors = taskAdapter.getSelectors(
  (state: RootState) => state.task
);
export const taskStore = (state: RootState) => state.task;
export default taskSlice.reducer;
