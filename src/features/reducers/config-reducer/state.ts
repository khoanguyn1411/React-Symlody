import { createEntityAdapter } from "@reduxjs/toolkit";

import { IConfigInfo, ITenant } from "@/features/types";

export interface ConfigInfosInner {
  pendingConfigManager: boolean;
  pendingTenant: boolean;
  tenant: ITenant;
}

export const configInfoAdapter = createEntityAdapter<IConfigInfo>({
  selectId: (configInfo) => configInfo.id,
});

export const initialState = configInfoAdapter.getInitialState<ConfigInfosInner>(
  {
    pendingConfigManager: false,
    pendingTenant: false,
    tenant: null,
  }
);

export type ConfigInfosState = typeof initialState;
