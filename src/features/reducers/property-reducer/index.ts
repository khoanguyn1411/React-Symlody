import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  PropertyApi,
  RequestCreatePropertyResult,
  RequestDeletePropertyResult,
  RequestGetPropertiesResult,
} from "@/api/property-api";
import { RootState } from "@/features/store";
import {
  IProperty,
  IPropertyCreateUpdate,
  PropertyMapper,
} from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk<
  IProperty[],
  TPropertyParamQueryDto,
  { rejectValue: [] }
>("get/properties", async (param, { rejectWithValue }) => {
  const result: RequestGetPropertiesResult = await PropertyApi.getProperties(
    param
  );
  if (result.kind === "ok") {
    return result.result.map((item) => PropertyMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const createPropertyAsync = createAsyncThunk<
  IProperty,
  IPropertyCreateUpdate,
  { rejectValue: null }
>("create/property", async (payload, { rejectWithValue }) => {
  const result: RequestCreatePropertyResult = await PropertyApi.createProperty(
    PropertyMapper.toDto(payload)
  );
  if (result.kind === "ok") {
    return PropertyMapper.fromDto(result.result);
  }
  return rejectWithValue(null);
});

export const deletePropertyAsync = createAsyncThunk<
  IProperty["id"],
  IProperty["id"],
  { rejectValue: null }
>("delete/property", async (id, { rejectWithValue }) => {
  const result: RequestDeletePropertyResult = await PropertyApi.deleteProperty(
    id
  );
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setListQueryProperty(state, action: PayloadAction<TPropertyParamQueryDto>) {
      state.listQueryProperty = action.payload;
    },
  },
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
      })

      .addCase(deletePropertyAsync.pending, (state) => {
        state.pendingDeleteProperty = true;
      })
      .addCase(deletePropertyAsync.fulfilled, (state, action) => {
        state.pendingDeleteProperty = false;
        propertyAdapter.removeOne(state, action.payload);
      })
      .addCase(deletePropertyAsync.rejected, (state) => {
        state.pendingDeleteProperty = false;
      });
  },
});
export const propertySelector = propertyAdapter.getSelectors(
  (state: RootState) => state.property
);
export const propertyStore = (state: RootState) => state.property;
export const { setListQueryProperty } = propertySlice.actions;
export default propertySlice.reducer;
