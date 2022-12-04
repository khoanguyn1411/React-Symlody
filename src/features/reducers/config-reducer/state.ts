import { createEntityAdapter } from "@reduxjs/toolkit";

import { IConfigInfo, Organization } from "@/features/types";

export interface ConfigInfosInner {
  pendingConfigManager: boolean;
  pendingOrganization: boolean;
  organization: Organization;
}

export const configInfoAdapter = createEntityAdapter<IConfigInfo>({
  selectId: (configInfo) => configInfo.id,
});

export const initialState = configInfoAdapter.getInitialState<ConfigInfosInner>(
  {
    pendingConfigManager: false,
    pendingOrganization: false,
    organization: null,
  }
);

export type ConfigInfosState = typeof initialState;
