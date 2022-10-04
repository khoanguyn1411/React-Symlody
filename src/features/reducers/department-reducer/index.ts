import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DepartmentApi } from "@/api/department-api";
import { RootState } from "@/features/store";
import { DepartmentMapper, IDepartment } from "@/features/types";
import { GlobalTypes } from "@/utils";

export type DepartmentState = {
  pending: boolean;
  departments: IDepartment[];
  department: IDepartment;
};

const initialState: DepartmentState = {
  pending: false,
  departments: [],
  department: null,
};

export const getDepartmentAsync = createAsyncThunk<
  IDepartment[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/department", async (payload, { rejectWithValue }) => {
  const result = await DepartmentApi.getDepartments();
  if (result.kind === "ok") {
    return result.result.map((item) => DepartmentMapper.fromDto(item));
  }

  return rejectWithValue([]);
});

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    getDepartment: (state, action: PayloadAction<{ id: number }>) => {
      const department = state.departments.find(
        (d) => d.id === action.payload.id
      );
      if (department) {
        state.department = department;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDepartmentAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.departments = action.payload;
      })
      .addCase(getDepartmentAsync.rejected, (state) => {
        state.pending = false;
        state.departments = [];
      });
  },
});
export const departmentStore = (state: RootState) => state.department;

export default departmentSlice.reducer;
