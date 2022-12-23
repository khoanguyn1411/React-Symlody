import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PropertyApi } from "@/api/property-api";
import { RootState, store } from "@/features/store";
import {
  HttpError,
  Property,
  PropertyCreation,
  propertyMapper,
} from "@/features/types";
import { propertyFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import { PropertyFilterParams } from "@/features/types/models/filter-params";
import { ErrorHandler } from "@/utils/funcs/error-handler";
import { validateSimpleRequestResult } from "@/utils/funcs/validate-simple-request-result";
import { ReduxThunk } from "@/utils/types";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk<
  Property[],
  PropertyFilterParams,
  ReduxThunk.RejectValue<[]>
>("property/get-list", async (param, { rejectWithValue, dispatch }) => {
  const paramDto = propertyFilterParamsMapper.toDto(param);
  const result = await PropertyApi.getProperties(paramDto);
  if (result.kind === "ok") {
    const propertyList = result.result.map((item) =>
      propertyMapper.fromDto(item)
    );
    dispatch(setCurrentPropertyList(propertyList));
    return propertyList;
  }
  return rejectWithValue([]);
});

export const createPropertyAsync = createAsyncThunk<
  Property,
  PropertyCreation,
  ReduxThunk.RejectValue<HttpError<PropertyCreation>>
>("property/create", async (payload, { rejectWithValue }) => {
  const result = await PropertyApi.createProperty(
    propertyMapper.toFormData(payload)
  );
  return validateSimpleRequestResult({
    result,
    mapper: propertyMapper,
    rejectWithValue,
  });
});

export const updatePropertyAsync = createAsyncThunk<
  ReduxThunk.RestoreResult<Property>,
  ReduxThunk.RestorePayload<PropertyCreation, Property>,
  ReduxThunk.RejectValue<HttpError<PropertyCreation>>
>(
  "property/update",
  async ({ payload, id, isRestore }, { rejectWithValue }) => {
    const propertyDto = propertyMapper.toFormData(payload);
    const result = await PropertyApi.updateProperty(id, propertyDto);
    if (result.kind === "ok") {
      const propertyUpdatedInfo = propertyMapper.fromDto(result.result);
      return {
        result: propertyUpdatedInfo,
        isRestore,
      };
    }
    return ErrorHandler.catchHttpError(propertyMapper, result, rejectWithValue);
  }
);

export const deletePropertyAsync = createAsyncThunk<
  Property["id"],
  Property["id"],
  ReduxThunk.RejectValue<null>
>("property/delete", async (id, { rejectWithValue }) => {
  const result = await PropertyApi.deleteProperty(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const setPropertyFilterParams = createAsyncThunk<
  void,
  Partial<PropertyFilterParams>
>("property/set-filter-params", async (params, { dispatch }) => {
  const reduxStore = store.getState();
  const currentPropertyParams = reduxStore.property.filterParamsProperty;
  dispatch(_setPropertyFilterParams({ ...currentPropertyParams, ...params }));
});

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    _setPropertyFilterParams(
      state,
      action: PayloadAction<PropertyFilterParams>
    ) {
      state.filterParamsProperty = action.payload;
    },
    setCurrentPropertyList(state, action: PayloadAction<Property[]>) {
      state.currentPropertyList = action.payload;
    },
    setPropertyListWithPagination(state, action: PayloadAction<Property[]>) {
      state.propertyListPagination = action.payload;
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

      .addCase(updatePropertyAsync.rejected, (state) => {
        state.pendingRestoreProperty = false;
      })
      .addCase(updatePropertyAsync.pending, (state) => {
        state.pendingRestoreProperty = true;
      })
      .addCase(updatePropertyAsync.fulfilled, (state, action) => {
        state.pendingRestoreProperty = false;
        const newProperty = action.payload.result;
        const shouldRemoveOne =
          action.payload.isRestore &&
          state.filterParamsProperty.isArchived != null;
        if (shouldRemoveOne) {
          propertyAdapter.removeOne(state, newProperty.id);
          return;
        }

        propertyAdapter.updateOne(state, {
          id: newProperty.id,
          changes: newProperty,
        });
      })

      .addCase(deletePropertyAsync.pending, (state) => {
        state.pendingDeleteProperty = true;
      })
      .addCase(deletePropertyAsync.fulfilled, (state, action) => {
        state.pendingDeleteProperty = false;
        if (state.filterParamsProperty.isArchived == null) {
          propertyAdapter.updateOne(state, {
            id: action.payload,
            changes: { isArchived: true },
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
export const {
  _setPropertyFilterParams,
  setCurrentPropertyList,
  setPropertyListWithPagination,
} = propertySlice.actions;
export default propertySlice.reducer;
