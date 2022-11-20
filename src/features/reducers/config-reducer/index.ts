import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RootState, store } from "@/features/store";
import { IConfigInfo, ITenant, ITenantCreateUpdateDto } from "@/features/types";
import {
  ConfigInfoMapper,
  ConfigMangerMapper,
} from "@/features/types/mappers/config-manager.mapper";
import { GlobalTypes } from "@/utils";
import { generateArrayWithNoDuplicate } from "@/utils/services/generate-service";

import { RequestUpdateTenantResult } from "../../../api/config-api/types";
import { TenantMapper } from "../../types/mappers/tenant.mapper";
import { userSelectors } from "../user-reducer";
import { configInfoAdapter, initialState } from "./state";

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

export const getConfigManager = createAsyncThunk<
  IConfigInfo[],
  null,
  GlobalTypes.ReduxThunkRejectValue<IConfigInfo[]>
>("get/config-manager", async (_, { rejectWithValue }) => {
  const result = await ConfigApi.getConfigManager();
  if (result.kind === "ok") {
    const configManagerModel = ConfigMangerMapper.fromDto(result.result);
    const reduxStore = store.getState();
    const userList = userSelectors.selectAll(reduxStore);
    const combinedLeaderManagerList = generateArrayWithNoDuplicate(
      configManagerModel.leaders.concat(configManagerModel.managers)
    );
    return userList.map((user) => {
      const userWithRole = combinedLeaderManagerList.find(
        (r) => r.id === user.id
      );
      return userWithRole ?? ConfigInfoMapper.fromUser(user);
    });
  }
  return rejectWithValue([]);
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

export const configSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET TENANT
      .addCase(getTenantAsync.pending, (state) => {
        state.pendingTenant = true;
      })
      .addCase(getTenantAsync.fulfilled, (state, action) => {
        state.pendingTenant = false;
        state.tenant = action.payload;
      })
      .addCase(getTenantAsync.rejected, (state) => {
        state.pendingTenant = false;
        state.tenant = null;
      })
      //UPDATE TENANT
      .addCase(updateTenantAsync.fulfilled, (state, action) => {
        state.tenant = action.payload;
      })

      // Config manager
      .addCase(getConfigManager.pending, (state) => {
        state.pendingConfigManager = true;
      })
      .addCase(getConfigManager.fulfilled, (state, action) => {
        state.pendingConfigManager = false;
        configInfoAdapter.setAll(state, action.payload);
      })
      .addCase(getConfigManager.rejected, (state) => {
        state.pendingConfigManager = false;
        configInfoAdapter.setAll(state, []);
      });
  },
});
export const configStore = (state: RootState) => state.config;
export const configSelectors = configInfoAdapter.getSelectors(
  (state: RootState) => state.config
);

export default configSlice.reducer;
