import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  HttpError,
  Organization,
  OrganizationCreation,
  UserPermissionConfigCreation,
  UserShort,
  userShortMapper,
} from "@/features/types";
import { UserPermissionConfigCreationDto } from "@/features/types/dtos/config-permission.dto";
import {
  leadersAndManagersMapper,
  userPermissionConfigMapper,
} from "@/features/types/mappers/config-permission.mapper";
import { GlobalTypes } from "@/utils";
import { generateArrayWithNoDuplicate } from "@/utils/services/generate-service";

import { organizationMapper } from "../../types/mappers/organization.mapper";
import { getUsersAsync, userSelectors } from "../user-reducer";
import { configInfoAdapter, initialState } from "./state";

export const getTenantAsync = createAsyncThunk<
  Organization,
  null,
  GlobalTypes.ReduxThunkRejectValue<null>
>("get/tenant", async (_, { rejectWithValue }) => {
  const result = await ConfigApi.getOrganization();
  if (result.kind === "ok") {
    return organizationMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const getConfigManager = createAsyncThunk<
  UserShort[],
  null,
  GlobalTypes.ReduxThunkRejectValue<UserShort[]>
>("get/config-manager", async (_, { rejectWithValue, dispatch }) => {
  const reduxStore = store.getState();
  const hasUser = userSelectors.selectTotal(reduxStore) > 0;

  const combinedPromise = hasUser
    ? Promise.all([ConfigApi.getConfigManager()])
    : Promise.all([ConfigApi.getConfigManager(), dispatch(getUsersAsync())]);

  const res = await combinedPromise;
  const resultConfigManager = res[0];
  const userListAfterPromise = res[1];

  if (!hasUser && getConfigManager.rejected.match(userListAfterPromise)) {
    return rejectWithValue([]);
  }

  if (resultConfigManager.kind !== "ok") {
    return rejectWithValue([]);
  }
  const configManagerModel = leadersAndManagersMapper.fromDto(
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
    return userWithRole ?? userShortMapper.fromUser(user);
  });
});

export const updateTenantAsync = createAsyncThunk<
  Organization,
  { id: number; body: OrganizationCreation },
  GlobalTypes.ReduxThunkRejectValue<null>
>("update/tenant", async (payload, { rejectWithValue }) => {
  const paramDto = organizationMapper.toFormData(payload.body);
  const result = await ConfigApi.updateOrganization(payload.id, paramDto);
  if (result.kind === "ok") {
    return organizationMapper.fromDto(result.result);
  }

  return rejectWithValue(null);
});

export const updateConfigRoleUserAsync = createAsyncThunk<
  UserShort,
  UserPermissionConfigCreation,
  GlobalTypes.ReduxThunkRejectValue<HttpError<UserPermissionConfigCreationDto> | null>
>("update/user-role", async (payload, { rejectWithValue }) => {
  const paramDto = userPermissionConfigMapper.toCreationDto(payload);
  const result = await ConfigApi.updateConfigRoleUser(paramDto);
  if (result.kind === "ok") {
    return userShortMapper.fromDto(result.result);
  }
  if (result.kind === "bad-data") {
    const errorBadData = userPermissionConfigMapper.httpErrorFromDto(
      result.httpError
    );
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
        state.pendingOrganization = true;
      })
      .addCase(getTenantAsync.fulfilled, (state, action) => {
        state.pendingOrganization = false;
        state.organization = action.payload;
      })
      .addCase(getTenantAsync.rejected, (state) => {
        state.pendingOrganization = false;
        state.organization = null;
      })
      //UPDATE TENANT
      .addCase(updateTenantAsync.fulfilled, (state, action) => {
        state.organization = action.payload;
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
