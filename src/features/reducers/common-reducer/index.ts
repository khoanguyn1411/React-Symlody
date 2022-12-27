import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/features/store";

export type CommonState = {
  isRouteLoading: boolean;
};

const initialState: CommonState = {
  isRouteLoading: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsRouteLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
  },
});
export const commonStore = (state: RootState) => state.common;

export const { setIsRouteLoading } = commonSlice.actions;

export default commonSlice.reducer;
