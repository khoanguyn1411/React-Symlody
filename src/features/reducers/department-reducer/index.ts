import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  DepartmentApi,
  RequestGetDepartmentResult,
} from "@/api/department-api";
import { RootState } from "@/features/store";
import { IDepartment } from "@/features/types";

export type DepartmentState = {
  pending: boolean;
  department: IDepartment[];
};

const initialState: DepartmentState = {
  pending: false,
  department: [],
};

export const getDepartmentAsync = createAsyncThunk(
  "get/department",
  async () => {
    const result: RequestGetDepartmentResult =
      await DepartmentApi.getDepartments();
    if (result.kind === "ok") {
      return result.result;
    }

    return [];
  }
);

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDepartmentAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.department = action.payload;
      })
      .addCase(getDepartmentAsync.rejected, (state) => {
        state.pending = false;
        state.department = [];
      });
  },
});
export const departmentStore = (state: RootState) => state.department;

export default departmentSlice.reducer;
