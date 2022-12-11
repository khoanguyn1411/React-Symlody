import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DepartmentApi } from "@/api/department-api";
import { RootState } from "@/features/store";
import {
  Department,
  DepartmentCreation,
  departmentMapper,
  HttpError,
} from "@/features/types";
import { GlobalTypes } from "@/utils";

import { departmentAdapter, initialState } from "./state";

export const getDepartmentAsync = createAsyncThunk<
  Department[],
  null,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/department", async (_, { rejectWithValue }) => {
  const result = await DepartmentApi.getDepartments();
  if (result.kind === "ok") {
    return result.result.map((item) => departmentMapper.fromDto(item));
  }

  return rejectWithValue([]);
});

export const createDepartmentAsync = createAsyncThunk<
  Department,
  DepartmentCreation,
  GlobalTypes.ReduxThunkRejectValue<null | HttpError<DepartmentCreation>>
>("create/department", async (payload, { rejectWithValue }) => {
  const departmentCreationDto = departmentMapper.toCreationDto(payload);
  const result = await DepartmentApi.createDepartment(departmentCreationDto);
  if (result.kind === "ok") {
    const department = result.result;
    return departmentMapper.fromDto(department);
  }

  if (result.kind === "bad-data") {
    const error = departmentMapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(error);
  }

  return rejectWithValue(null);
});

export const updateDepartmentAsync = createAsyncThunk<
  Department,
  { id: number; body: DepartmentCreation },
  GlobalTypes.ReduxThunkRejectValue<null | HttpError<DepartmentCreation>>
>("update/department", async (payload, { rejectWithValue }) => {
  const departmentCreationDto = departmentMapper.toCreationDto(payload.body);
  const result = await DepartmentApi.updateDepartment(
    payload.id,
    departmentCreationDto
  );
  if (result.kind === "ok") {
    const department = result.result;
    return departmentMapper.fromDto(department);
  }

  if (result.kind === "bad-data") {
    const error = departmentMapper.httpErrorFromDto(result.httpError);
    return rejectWithValue(error);
  }

  return rejectWithValue(null);
});

export const deleteDepartmentAsync = createAsyncThunk<
  Department["id"],
  Department["id"],
  GlobalTypes.ReduxThunkRejectValue<boolean>
>("delete/department", async (id, { rejectWithValue }) => {
  const result = await DepartmentApi.deleteDepartment(id);
  if (result.kind === "ok") {
    return id;
  }

  return rejectWithValue(null);
});

// export const getTenantAsync = createAsyncThunk<
//   Organization,
//   null,
//   GlobalTypes.ReduxThunkRejectValue<null>
// >("get/tenant", async (payload, { rejectWithValue }) => {
//   const result = await DepartmentApi.getTenant();
//   if (result.kind === "ok") {
//     return result.result;
//   }

//   return rejectWithValue(null);
// });

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
    //GET TENANT
    // .addCase(getTenantAsync.pending, (state) => {
    //   state.pending = true;
    // })
    // .addCase(getTenantAsync.fulfilled, (state, action) => {
    //   state.pending = false;
    //   state.tenant = action.payload;
    // })
    // .addCase(getTenantAsync.rejected, (state) => {
    //   state.pending = false;
    //   state.tenant = null;
    // });
  },
});
export const departmentStore = (state: RootState) => state.department;
export const departmentSelectors = departmentAdapter.getSelectors(
  (state: RootState) => state.department
);
export default departmentSlice.reducer;
