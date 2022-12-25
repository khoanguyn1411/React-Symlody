import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState, store } from "@/features/store";
import { ErrorResponse, Task, taskMapper, User } from "@/features/types";
import { taskFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import { TaskFilterParams } from "@/features/types/models/filter-params";
import { TaskCreation } from "@/features/types/models/task";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { ReduxThunk } from "@/utils/types";

import { userSelectors } from "../user-reducer";
import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  Task[],
  TaskFilterParams,
  ReduxThunk.RejectValue<[]>
>("task/get-list", async (param, { rejectWithValue }) => {
  const paramDto = taskFilterParamsMapper.toDto(param);
  const result = await TaskApi.getTasks(paramDto);
  if (result.kind === "ok") {
    return result.result_dto.map((item) => taskMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const deleteTaskAsync = createAsyncThunk<
  Task["id"],
  Task["id"],
  ReduxThunk.RejectValue<null>
>("task/delete", async (id, { rejectWithValue }) => {
  const result = await TaskApi.deleteTask(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const createTaskAsync = createAsyncThunk<
  { task: Task; shouldAddOne: boolean },
  { task: TaskCreation },
  ReduxThunk.RejectValue<ErrorResponse<TaskCreation>>
>("task/create", async (body, { rejectWithValue }) => {
  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === body.task.assignee.id);
  const currentDepartmentId = reduxStore.task.filterParamsTask.departmentId;

  const isInSelectedDepartment = assignee.departmentId === currentDepartmentId;

  const taskDto = taskMapper.toCreationDto(body.task);
  const result = await TaskApi.createTask(taskDto);
  if (result.kind === "ok") {
    return {
      task: taskMapper.fromDto(result.result_dto),
      shouldAddOne: isInSelectedDepartment,
    };
  }
  return ErrorHandler.catchErrors({
    rejectWithValue,
    result,
    mapper: taskMapper,
  });
});

export const updateTaskAsync = createAsyncThunk<
  {
    task: Task;
    shouldRemoveOne: boolean;
  },
  {
    id: Task["id"];
    payload: TaskCreation;
  },
  ReduxThunk.RejectValue<ErrorResponse<TaskCreation>>
>("task/update", async ({ id, payload }, { rejectWithValue }) => {
  const taskDto = taskMapper.toCreationDto(payload);
  const result = await TaskApi.updateTask(id, taskDto);

  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === payload.assignee.id);
  const currentDepartmentId = reduxStore.task.filterParamsTask.departmentId;
  const isNotInSelectedDepartment =
    assignee.departmentId !== currentDepartmentId;
  if (result.kind === "ok") {
    return {
      task: taskMapper.fromDto(result.result_dto),
      shouldRemoveOne: isNotInSelectedDepartment,
    };
  }
  return ErrorHandler.catchErrors({
    rejectWithValue,
    result,
    mapper: taskMapper,
  });
});

export const setTaskFilterParams = createAsyncThunk<
  void,
  Partial<TaskFilterParams>
>("task/set-filter-params", async (params, { dispatch }) => {
  const reduxStore = store.getState();
  const currentMemberParams = reduxStore.task.filterParamsTask;
  dispatch(_setTaskFilterParams({ ...currentMemberParams, ...params }));
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    _setTaskFilterParams(state, action: PayloadAction<TaskFilterParams>) {
      state.filterParamsTask = action.payload;
    },

    setCurrentTaskList(state, action: PayloadAction<Task[]>) {
      state.currentListTask = action.payload;
    },
    getTasksByAssignee(
      state,
      action: PayloadAction<{ taskList: Task[]; userList: User[] }>
    ) {
      const { taskList, userList } = action.payload;

      const selectedMemberIdsList =
        state.filterParamsTask.selectedMemberList.map((member) => member.id);

      if (selectedMemberIdsList.length === 0) {
        state.currentListTask = taskList;
        return;
      }
      state.currentListTask = taskList.filter((task) => {
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
      })

      .addCase(deleteTaskAsync.pending, (state) => {
        state.pendingDeleteTask = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.pendingDeleteTask = false;
        taskAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state) => {
        state.pendingDeleteTask = false;
      });
  },
});
export const taskSelectors = taskAdapter.getSelectors(
  (state: RootState) => state.task
);
export const taskStore = (state: RootState) => state.task;
export const { _setTaskFilterParams, setCurrentTaskList } = taskSlice.actions;

export default taskSlice.reducer;
