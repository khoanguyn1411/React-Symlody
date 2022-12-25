import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ConfigApi } from "@/api";
import { RootState, store } from "@/features/store";
import {
  Organization,
  OrganizationCreation,
  UserPermissionConfigCreation,
  UserShort,
  UserShortMapper,
  userShortMapper,
} from "@/features/types";
import {
  leadersAndManagersMapper,
  userPermissionConfigMapper,
} from "@/features/types/mappers/config-permission.mapper";
import { ErrorResponse } from "@/features/types/models/error-response";
import { generateArrayWithNoDuplicate } from "@/utils/funcs/generate-array-with-no-duplicate";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
import { ReduxThunk } from "@/utils/types";

import { organizationMapper } from "../../types/mappers/organization.mapper";
import { getUsersAsync, userSelectors } from "../user-reducer";
import { configInfoAdapter, initialState } from "./state";

export const getOrganizationAsync = createAsyncThunk<
  Organization,
  null,
  ReduxThunk.RejectValue<null>
>("organization/get", async (_, { rejectWithValue }) => {
  const result = await ConfigApi.getOrganization();
  if (result.kind === "ok") {
    return organizationMapper.fromDto(result.result_dto);
  }
  return rejectWithValue(null);
});

export const getConfigManager = createAsyncThunk<
  UserShort[],
  null,
  ReduxThunk.RejectValue<UserShort[]>
>("organization/get-managers", async (_, { rejectWithValue, dispatch }) => {
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
    resultConfigManager.result_dto
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

export const updateOrganizationAsync = createAsyncThunk<
  Organization,
  { id: number; body: OrganizationCreation },
  ReduxThunk.RejectValue<ErrorResponse<OrganizationCreation>>
>("organization/update", async (payload, { rejectWithValue }) => {
  const paramDto = organizationMapper.toFormData(payload.body);
  const result = await ConfigApi.updateOrganization(payload.id, paramDto);
  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: organizationMapper,
  });
});

export const updateConfigRoleUserAsync = createAsyncThunk<
  UserShort,
  {
    body: UserPermissionConfigCreation;
    id: UserShort["id"];
    avatarUrl: UserShort["avatarUrl"];
  },
  ReduxThunk.RejectValue<ErrorResponse<UserPermissionConfigCreation>>
>("user-role/update", async ({ body, id, avatarUrl }, { rejectWithValue }) => {
  const paramDto = userPermissionConfigMapper.toCreationDto(body);
  const result = await ConfigApi.updateConfigRoleUser(paramDto, id);
  return validateSimpleRequestResult({
    rejectWithValue,
    result,
    mapper: userPermissionConfigMapper,
    fromDtoMapperSupport: new UserShortMapper(avatarUrl),
  });
});

export const configSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationAsync.pending, (state) => {
        state.pendingOrganization = true;
      })
      .addCase(getOrganizationAsync.fulfilled, (state, action) => {
        state.pendingOrganization = false;
        state.organization = action.payload;
      })
      .addCase(getOrganizationAsync.rejected, (state) => {
        state.pendingOrganization = false;
        state.organization = null;
      })
      .addCase(updateOrganizationAsync.fulfilled, (state, action) => {
        state.organization = action.payload;
      })

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
