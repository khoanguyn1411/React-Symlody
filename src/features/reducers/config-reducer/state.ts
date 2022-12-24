import { createEntityAdapter } from "@reduxjs/toolkit";

import {
  ErrorResponse,
  Organization,
  OrganizationCreation,
  UserPermissionConfigCreation,
  UserShort,
} from "@/features/types";

export interface ConfigInfosInner {
  pendingConfigManager: boolean;
  pendingOrganization: boolean;
  organization: Organization;
  errorsUserPermissionConfig: ErrorResponse<UserPermissionConfigCreation>;
  errorsOrganization: ErrorResponse<OrganizationCreation>;
}

export const configInfoAdapter = createEntityAdapter<UserShort>({
  selectId: (configInfo) => configInfo.id,
});

export const initialState = configInfoAdapter.getInitialState<ConfigInfosInner>(
  {
    pendingConfigManager: true,
    pendingOrganization: true,
    organization: null,
    errorsUserPermissionConfig: null,
    errorsOrganization: null,
  }
);

export type ConfigInfosState = typeof initialState;
