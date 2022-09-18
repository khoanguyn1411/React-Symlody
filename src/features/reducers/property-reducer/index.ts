import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  PropertyApi,
  RequestCreatePropertyResult,
  RequestGetPropertiesResult,
} from "@/api/property-api";
import { RootState } from "@/features/store";
import { PropertyMapper } from "@/features/types";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk("get/properties", async () => {
  const result: RequestGetPropertiesResult = await PropertyApi.getProperties();
  if (result.kind === "ok") {
    return result.result.map((item) => PropertyMapper.fromDto(item));
  }
  return [];
});

export const createPropertyAsync = createAsyncThunk(
  "create/property",
  async () => {
    const result: RequestCreatePropertyResult =
      await PropertyApi.createProperty();
    if (result.kind === "ok") {
      return PropertyMapper.fromDto(result.result);
    }
    return null;
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getPropertyAsync.fulfilled, (state, action) => {
        state.pending = false;
        propertyAdapter.setAll(state, action.payload);
      })
      .addCase(getPropertyAsync.rejected, (state) => {
        state.pending = false;
        propertyAdapter.setAll(state, []);
      })
      .addCase(createPropertyAsync.fulfilled, (state, action) => {
        state.pending = false;
        propertyAdapter.addOne(state, action.payload);
      });
  },
});
export const propertySelector = propertyAdapter.getSelectors(
  (state: RootState) => state.property
);
export const propertyStore = (state: RootState) => state.member;
export default propertySlice.reducer;
