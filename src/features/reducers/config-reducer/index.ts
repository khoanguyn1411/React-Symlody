import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  HttpError,
  IConfigInfo,
  IConfigUserUpdate,
  ITenant,
  ITenantCreateUpdate,
} from "@/features/types";
import {
  ConfigInfoMapper,
  ConfigMangerMapper,
  ConfigUserMapper,
} from "@/features/types/mappers/config-manager.mapper";
import { HttpErrorMapper } from "@/features/types/mappers/http-error.mapper";
import { GlobalTypes } from "@/utils";
import { generateArrayWithNoDuplicate } from "@/utils/services/generate-service";

import { TenantMapper } from "../../types/mappers/tenant.mapper";
import { getUsersAsync, userSelectors } from "../user-reducer";
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
>("get/config-manager", async (_, { rejectWithValue, dispatch }) => {
  const reduxStore = store.getState();
  const hasUser = userSelectors.selectTotal(reduxStore) > 0;

  const combinedPromise = hasUser
    ? Promise.all([ConfigApi.getConfigManager()])
    : Promise.all([ConfigApi.getConfigManager(), dispatch(getUsersAsync())]);

  const res = await combinedPromise;
  const resultConfigManager = res[0];
  const userListAfterPromise = res[1];

  if (!hasUser && userListAfterPromise.meta.requestStatus === "rejected") {
    return rejectWithValue([]);
  }

  if (resultConfigManager.kind !== "ok") {
    return rejectWithValue([]);
  }
  const configManagerModel = ConfigMangerMapper.fromDto(
    resultConfigManager.result
  );
  const combinedLeaderManagerList = generateArrayWithNoDuplicate(
    configManagerModel.leaders.concat(configManagerModel.managers)
  );

  const userListCurrent = userSelectors.selectAll(reduxStore);
  const userList = hasUser ? userListCurrent : userListAfterPromise.payload;

  return userList.map((user) => {
    const userWithRole = combinedLeaderManagerList.find(
      (r) => r.id === user.id
    );
    return userWithRole ?? ConfigInfoMapper.fromUser(user);
  });
});

export const updateTenantAsync = createAsyncThunk<
  ITenant,
  { id: number; body: ITenantCreateUpdate },
  GlobalTypes.ReduxThunkRejectValue<null>
>("update/tenant", async (payload, { rejectWithValue }) => {
  const paramDto = TenantMapper.toDto(payload.body);
  const result = await ConfigApi.updateTenant(payload.id, paramDto);
  if (result.kind === "ok") {
    return TenantMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const updateConfigRoleUserAsync = createAsyncThunk<
  IConfigInfo,
  IConfigUserUpdate,
  GlobalTypes.ReduxThunkRejectValue<HttpError>
>("update/user-role", async (payload, { rejectWithValue }) => {
  const paramDto = ConfigUserMapper.toDto(payload);
  const result = await ConfigApi.updateConfigRoleUser(paramDto);
  if (result.kind === "ok") {
    return ConfigInfoMapper.fromDto(result.result);
  }
  if (result.kind === "bad-data") {
    const errorBadData = HttpErrorMapper.fromDto(result.result.data);
    return rejectWithValue(errorBadData);
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

      // Get config manager
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
      })

      // Config role
      .addCase(updateConfigRoleUserAsync.fulfilled, (state, action) => {
        configInfoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      });
  },
});
export const configStore = (state: RootState) => state.config;
export const configSelectors = configInfoAdapter.getSelectors(
  (state: RootState) => state.config
);

export default configSlice.reducer;
