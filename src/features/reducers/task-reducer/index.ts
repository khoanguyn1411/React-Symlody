import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskApi } from "@/api";
import { RootState, store } from "@/features/store";
import { Task, TaskMapper, User } from "@/features/types";
import { TaskCreation } from "@/features/types/models/task";
import { TTaskParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";

import { userSelectors } from "../user-reducer";
import { initialState, taskAdapter } from "./state";

export const getTasksAsync = createAsyncThunk<
  Task[],
  TTaskParamQueryDto,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/tasks", async (param, { rejectWithValue }) => {
  const result = await TaskApi.getTasks(param);
  if (result.kind === "ok") {
    return result.result.map((item) => TaskMapper.fromDto(item));
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
  const currentDepartmentId = reduxStore.task.listQueryTask.department_id;

  const isInSelectedDepartment = assignee.department_id === currentDepartmentId;

  const taskDto = TaskMapper.toDto(body.task);
  const result = await TaskApi.createTask(taskDto);
  if (result.kind === "ok") {
    return {
      task: TaskMapper.fromDto(result.result),
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
  const taskDto = TaskMapper.toDto(payload);
  const result = await TaskApi.updateTask(id, taskDto);

  const reduxStore = store.getState();
  const userList = userSelectors.selectAll(reduxStore);
  const assignee = userList.find((user) => user.id === payload.assignee.id);
  const currentDepartmentId = reduxStore.task.listQueryTask.department_id;

  const isNotInSelectedDepartment =
    assignee.department_id !== currentDepartmentId;
  if (result.kind === "ok") {
    return {
      task: TaskMapper.fromDto(result.result),
      shouldRemoveOne: isNotInSelectedDepartment,
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
    setSelectedMemberList(state, action: PayloadAction<User[] | null>) {
      state.listQueryTask = {
        ...state.listQueryTask,
        selected_member_list: action.payload,
      };
    },
    getTasksByAssignee(
      state,
      action: PayloadAction<{ taskList: Task[]; userList: User[] }>
    ) {
      const { taskList, userList } = action.payload;

      const selectedMemberIdsList =
        state.listQueryTask.selected_member_list.map((member) => member.id);

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
export const { setListQueryTask, setSelectedMemberList, getTasksByAssignee } =
  taskSlice.actions;

export default taskSlice.reducer;
