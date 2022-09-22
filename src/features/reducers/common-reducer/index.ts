import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { APP_CONSTANTS } from "@/constants";
import { RootState } from "@/features/store";
import { LocalStorageService } from "@/utils";

export type CommonState = {
  isCompactSidebar: boolean;
};

const initialState: CommonState = {
  isCompactSidebar: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleCompactSidebar: (state) => {
      state.isCompactSidebar = !state.isCompactSidebar;
      LocalStorageService.setValue<boolean>(
        APP_CONSTANTS.IS_COMPACT_SIDEBAR,
        state.isCompactSidebar
      );
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 280);
    },
    setIsCompactSidebar: (state, action: PayloadAction<boolean>) => {
      state.isCompactSidebar = action.payload;
    },
  },
});
export const commonStore = (state: RootState) => state.common;

export const { setIsCompactSidebar, toggleCompactSidebar } =
  commonSlice.actions;

export default commonSlice.reducer;
