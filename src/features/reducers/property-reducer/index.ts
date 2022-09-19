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

export const getPropertyAsync = createAsyncThunk(
  "get/properties",
  async (param: TPropertyParamQueryDto) => {
    const result: RequestGetPropertiesResult = await PropertyApi.getProperties(
      param
    );
    if (result.kind === "ok") {
      return result.result.map((item) => PropertyMapper.fromDto(item));
    }
    return [];
  }
);

export const createPropertyAsync = createAsyncThunk(
  "create/member",
  async (payload: IPropertyCreateUpdate) => {
    console.log(PropertyMapper.toDto(payload));
    const result: RequestCreatePropertyResult =
      await PropertyApi.createProperty(PropertyMapper.toDto(payload));
    if (result.kind === "ok") {
      return PropertyMapper.fromDto(result.result);
    }
    return null;
  }
);

export const deletePropertyAsync = createAsyncThunk(
  "delete/property",
  async (id: IProperty["id"]) => {
    const result: RequestDeletePropertyResult =
      await PropertyApi.deleteProperty(id);
    if (result.kind === "ok") {
      return id;
    }
    return null;
  }
);

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
