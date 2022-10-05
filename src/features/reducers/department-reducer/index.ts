import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TenantApi } from "@/api";
import { RootState } from "@/features/store";
import { DepartmentMapper, IDepartment, ITenant } from "@/features/types";
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
  const result = await TenantApi.getDepartments();
  if (result.kind === "ok") {
    return result.result.map((item) => DepartmentMapper.fromDto(item));
  }

  return rejectWithValue([]);
});

export const getTenantAsync = createAsyncThunk<
  ITenant,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("get/tenant", async (payload, { rejectWithValue }) => {
  const result = await TenantApi.getTenant();
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
