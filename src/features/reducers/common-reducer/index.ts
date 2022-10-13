import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { EConfigTabKey } from "@/container/config-container/type";
import { ETodoTabKey } from "@/container/todo-container/type";
import { RootState } from "@/features/store";
import { LocalStorageService } from "@/utils";

type TActiveTab = { config: EConfigTabKey; todo: ETodoTabKey };

export type CommonState = {
  isCompactSidebar: boolean;
  activeTab: TActiveTab;
};

const initialState: CommonState = {
  isCompactSidebar: false,
  activeTab: {
    config: EConfigTabKey.Organization,
    todo: ETodoTabKey.Kanban,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleCompactSidebar: (state) => {
      state.isCompactSidebar = !state.isCompactSidebar;
      LocalStorageService.setValue<boolean>(
        APP_LOCAL_STORAGE_KEYS.IS_COMPACT_SIDEBAR,
        state.isCompactSidebar
      );
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 280);
    },
    setIsCompactSidebar: (state, action: PayloadAction<boolean>) => {
      state.isCompactSidebar = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<Partial<TActiveTab>>) => {
      state.activeTab = { ...state.activeTab, ...action.payload };
    },
  },
});
export const commonStore = (state: RootState) => state.common;

export const { setIsCompactSidebar, toggleCompactSidebar, setActiveTab } =
  commonSlice.actions;

export default commonSlice.reducer;
