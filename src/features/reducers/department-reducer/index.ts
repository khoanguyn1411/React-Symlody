import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RequestCreateDepartmentResult } from "@/api/config-api/types";
import { RootState } from "@/features/store";
import {
  DepartmentMapper,
  IDepartment,
  IDepartmentCreateUpdate,
  ITenant,
} from "@/features/types";
import { GlobalTypes } from "@/utils";

export type DepartmentState = {
  pending: boolean;
  departments: IDepartment[];
  department: IDepartment;
  tenant: ITenant;
};

const initialState: DepartmentState = {
  pending: false,
  departments: [],
  department: null,
  tenant: null,
};

export const getDepartmentAsync = createAsyncThunk<
  IDepartment[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/department", async (payload, { rejectWithValue }) => {
  const result = await ConfigApi.getDepartments();
  if (result.kind === "ok") {
    return result.result.map((item) => DepartmentMapper.fromDto(item));
  }

  return rejectWithValue([]);
});

export const createDepartmentAsync = createAsyncThunk<
  IDepartment,
  IDepartmentCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<RequestCreateDepartmentResult>
>("create/department", async (payload, { rejectWithValue }) => {
  const result = await ConfigApi.createDepartment(payload);
  if (result.kind === "ok") {
    const department = result.result;
    return DepartmentMapper.fromDto(department);
  }

  return rejectWithValue(null);
});

export const getTenantAsync = createAsyncThunk<
  ITenant,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("get/tenant", async (payload, { rejectWithValue }) => {
  const result = await ConfigApi.getTenant();
  if (result.kind === "ok") {
    return result.result;
  }

  return rejectWithValue(null);
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
      })
      //create department
      .addCase(createDepartmentAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(createDepartmentAsync.fulfilled, (state, action) => {
        state.pending = false;
        const newDepartment = action.payload;
        state.departments = [...state.departments, newDepartment];
      })
      .addCase(createDepartmentAsync.rejected, (state) => {
        state.pending = false;
        // state.departments = [];
      })
      //get tenant
      .addCase(getTenantAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTenantAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.tenant = action.payload;
      })
      .addCase(getTenantAsync.rejected, (state) => {
        state.pending = false;
        state.tenant = null;
      });
  },
});
export const departmentStore = (state: RootState) => state.department;

export default departmentSlice.reducer;
