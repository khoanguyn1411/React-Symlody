import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PropertyApi } from "@/api/property-api";
import { RootState } from "@/features/store";
import {
  IProperty,
  IPropertyCreateUpdate,
  PropertyMapper,
} from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk<
  IProperty[],
  TPropertyParamQueryDto,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/properties", async (param, { rejectWithValue }) => {
  const result = await PropertyApi.getProperties(param);
  if (result.kind === "ok") {
    return result.result.map((item) => PropertyMapper.fromDto(item));
  }
  return rejectWithValue([]);
});

export const createPropertyAsync = createAsyncThunk<
  IProperty,
  IPropertyCreateUpdate,
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/property", async (payload, { rejectWithValue }) => {
  const result = await PropertyApi.createProperty(
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
  GlobalTypes.ReduxThunkRejectValue<null>
>("delete/property", async (id, { rejectWithValue }) => {
  const result = await PropertyApi.deleteProperty(id);
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
    getPaginationProperty(
      state,
      action: PayloadAction<
        GlobalTypes.StrictPick<TPropertyParamQueryDto, "limit" | "page"> & {
          propertyList: IProperty[];
        }
      >
    ) {
      const { propertyList, limit, page } = action.payload;
      const propertyListPagination = propertyList.slice(
        (page - 1) * limit,
        page * limit
      );
      state.propertyListPagination = propertyListPagination;
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
        if (state.listQueryProperty.is_archived == null) {
          propertyAdapter.updateOne(state, {
            id: action.payload,
            changes: { is_archived: true },
          });
          return;
        }
        propertyAdapter.removeOne(state, action.payload);
      })
      .addCase(deletePropertyAsync.rejected, (state) => {
        state.pendingDeleteProperty = false;
      });
  },
});
export const propertySelectors = propertyAdapter.getSelectors(
  (state: RootState) => state.property
);
export const propertyStore = (state: RootState) => state.property;
export const { setListQueryProperty, getPaginationProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
