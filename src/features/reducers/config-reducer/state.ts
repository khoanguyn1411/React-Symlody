import { createEntityAdapter } from "@reduxjs/toolkit";

import { Organization, UserShort } from "@/features/types";

export interface ConfigInfosInner {
  pendingConfigManager: boolean;
  pendingOrganization: boolean;
  organization: Organization;
}

export const configInfoAdapter = createEntityAdapter<UserShort>({
  selectId: (configInfo) => configInfo.id,
});

export const initialState = configInfoAdapter.getInitialState<ConfigInfosInner>(
  {
    pendingConfigManager: true,
    pendingOrganization: true,
    organization: null,
  }
);

export type ConfigInfosState = typeof initialState;
