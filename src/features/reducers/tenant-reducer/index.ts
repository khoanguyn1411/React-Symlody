import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RootState } from "@/features/store";
import { ITenant, ITenantCreateUpdateDto } from "@/features/types";
import { GlobalTypes } from "@/utils";

import { RequestUpdateTenantResult } from "./../../../api/config-api/types";
import { TenantMapper } from "./../../types/mappers/tenant.mapper";

export type TenantState = {
  pending: boolean;
  tenant: ITenant;
};

const initialState: TenantState = {
  pending: false,
  tenant: null,
};

export const getTenantAsync = createAsyncThunk<
  ITenant,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("get/tenant", async (_, { rejectWithValue }) => {
  const result = await ConfigApi.getTenant();
  if (result.kind === "ok") {
    return result.result;
  }

  return rejectWithValue(null);
});

export const updateTenantAsync = createAsyncThunk<
  ITenant,
  { id: number; body: ITenantCreateUpdateDto },
  GlobalTypes.ReduxThunkRestoreRejected<RequestUpdateTenantResult>
>("update/tenant", async (payload, { rejectWithValue }) => {
  const result = await ConfigApi.updateTenant(payload.id, payload.body);
  if (result.kind === "ok") {
    return TenantMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET TENANT
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
      })
      //UPDATE TENANT
      .addCase(updateTenantAsync.fulfilled, (state, action) => {
        state.tenant = action.payload;
      });
  },
});
export const tenantStore = (state: RootState) => state.tenant;

export default tenantSlice.reducer;
