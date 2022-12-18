import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DepartmentApi } from "@/api/department-api";
import { RootState } from "@/features/store";
import {
  Department,
  DepartmentCreation,
  departmentMapper,
  HttpError,
} from "@/features/types";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
import { ReduxThunk } from "@/utils/types";

import { departmentAdapter, initialState } from "./state";

export const getDepartmentAsync = createAsyncThunk<
  Department[],
  null,
  ReduxThunk.RejectValue<[]>
>("department/get-list", async (_, { rejectWithValue }) => {
  const result = await DepartmentApi.getDepartments();
  if (result.kind === "ok") {
    return result.result.map((item) => departmentMapper.fromDto(item));
  }

  return rejectWithValue([]);
});

export const createDepartmentAsync = createAsyncThunk<
  Department,
  DepartmentCreation,
  ReduxThunk.RejectValue<HttpError<DepartmentCreation>>
>("department/create", async (payload, { rejectWithValue }) => {
  const departmentCreationDto = departmentMapper.toCreationDto(payload);
  const result = await DepartmentApi.createDepartment(departmentCreationDto);
  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: departmentMapper,
  });
});

export const updateDepartmentAsync = createAsyncThunk<
  Department,
  { id: number; body: DepartmentCreation },
  ReduxThunk.RejectValue<HttpError<DepartmentCreation>>
>("department/update", async (payload, { rejectWithValue }) => {
  const departmentCreationDto = departmentMapper.toCreationDto(payload.body);
  const result = await DepartmentApi.updateDepartment(
    payload.id,
    departmentCreationDto
  );
  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: departmentMapper,
  });
});

export const deleteDepartmentAsync = createAsyncThunk<
  Department["id"],
  Department["id"],
  ReduxThunk.RejectValue<boolean>
>("department/delete", async (id, { rejectWithValue }) => {
  const result = await DepartmentApi.deleteDepartment(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

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
        departmentAdapter.setAll(state, action.payload);
      })
      .addCase(getDepartmentAsync.rejected, (state) => {
        state.pending = false;
        departmentAdapter.setAll(state, []);
      })

      .addCase(createDepartmentAsync.fulfilled, (state, action) => {
        const newDepartment = action.payload;
        departmentAdapter.addOne(state, newDepartment);
      })

      .addCase(updateDepartmentAsync.fulfilled, (state, action) => {
        const newDepartment = action.payload;
        departmentAdapter.updateOne(state, {
          id: newDepartment.id,
          changes: newDepartment,
        });
      })

      .addCase(deleteDepartmentAsync.fulfilled, (state, action) => {
        const departmentId = action.payload;
        departmentAdapter.removeOne(state, departmentId);
      });
  },
});
export const departmentStore = (state: RootState) => state.department;
export const departmentSelectors = departmentAdapter.getSelectors(
  (state: RootState) => state.department
);
export default departmentSlice.reducer;
