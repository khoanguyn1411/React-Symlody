import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState, store } from "@/features/store";
import { Task, taskMapper, User } from "@/features/types";
import { taskFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import { TaskFilterParams } from "@/features/types/models/filter-params";
import { TaskCreation } from "@/features/types/models/task";
import { GlobalTypes } from "@/utils";

import { userSelectors } from "../user-reducer";
import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  Task[],
  TaskFilterParams,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/tasks", async (param, { rejectWithValue }) => {
  const paramDto = taskFilterParamsMapper.toDto(param);
  const result = await TaskApi.getTasks(paramDto);
  if (result.kind === "ok") {
    return result.result.map((item) => taskMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const deleteTaskAsync = createAsyncThunk<
  Task["id"],
  Task["id"],
  GlobalTypes.ReduxThunkRejectValue<null>
>("delete/task", async (id, { rejectWithValue }) => {
  const result = await TaskApi.deleteTask(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const createTaskAsync = createAsyncThunk<
  { task: Task; shouldAddOne: boolean },
  { task: TaskCreation },
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/task", async (body, { rejectWithValue }) => {
  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === body.task.assignee.id);
  const currentDepartmentId = reduxStore.task.filterParamsTask.departmentId;

  const isInSelectedDepartment = assignee.departmentId === currentDepartmentId;

  const taskDto = taskMapper.toCreationDto(body.task);
  const result = await TaskApi.createTask(taskDto);
  if (result.kind === "ok") {
    return {
      task: taskMapper.fromDto(result.result),
      shouldAddOne: isInSelectedDepartment,
    };
  }
  return rejectWithValue(null);
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
  GlobalTypes.ReduxThunkRejectValue<null>
>("update/task", async ({ id, payload }, { rejectWithValue }) => {
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
      task: taskMapper.fromDto(result.result),
      shouldRemoveOne: isNotInSelectedDepartment,
    };
  }
  return rejectWithValue(null);
});

export const filterTaskByAssignee = createAsyncThunk<
  void,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("filter-by-assignee/task", async (_, { dispatch }) => {
  const reduxStore = store.getState();
  const taskList = taskSelectors.selectAll(reduxStore);
  const userList = userSelectors.selectAll(reduxStore);
  const taskStore = reduxStore.task;

  const selectedMemberIdsList =
    taskStore.filterParamsTask.selectedMemberList.map((member) => member.id);

  if (selectedMemberIdsList.length === 0) {
    dispatch(setCurrentListTask(taskList));
    return;
  }
  const newTaskList = taskList.filter((task) => {
    const taskInfo = userList.find((user) => user.id === task.assignee.id);
    if (taskInfo) {
      return selectedMemberIdsList.includes(taskInfo.id);
    }
  });
  dispatch(setCurrentListTask(newTaskList));
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilterParamsTask(
      state,
      action: PayloadAction<Partial<TaskFilterParams>>
    ) {
      state.filterParamsTask = { ...state.filterParamsTask, ...action.payload };
    },

    setCurrentListTask(state, action: PayloadAction<Task[]>) {
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
export const { setFilterParamsTask, setCurrentListTask } = taskSlice.actions;

export default taskSlice.reducer;
