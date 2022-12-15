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
import { FilterService, GlobalTypes } from "@/utils";
import {
  catchHttpError,
  validateSimpleRequestResult,
} from "@/utils/services/error-handler-service";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk<
  Property[],
  PropertyFilterParams,
  GlobalTypes.ReduxThunkRejectValue<[]>
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
  GlobalTypes.ReduxThunkRejectValue<HttpError<PropertyCreation>>
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
  GlobalTypes.ReduxThunkRestoreResult<Property>,
  GlobalTypes.ReduxThunkRestorePayload<PropertyCreation, Property>,
  GlobalTypes.ReduxThunkRejectValue<HttpError<PropertyCreation>>
>(
  "property/update",
  async ({ payload, id, isRestore }, { rejectWithValue }) => {
    const propertyDto = propertyMapper.toCreationDto(payload);
    const result = await PropertyApi.updateProperty(id, propertyDto);
    if (result.kind === "ok") {
      const propertyUpdatedInfo = propertyMapper.fromDto(result.result);
      return {
        result: propertyUpdatedInfo,
        isRestore,
      };
    }
    return catchHttpError(propertyMapper, result, rejectWithValue);
  }
);

export const deletePropertyAsync = createAsyncThunk<
  Property["id"],
  Property["id"],
  GlobalTypes.ReduxThunkRejectValue<null>
>("property/delete", async (id, { rejectWithValue }) => {
  const result = await PropertyApi.deleteProperty(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const paginatePropertyAsync = createAsyncThunk<void, undefined>(
  "property/paginate",
  async (_, { dispatch }) => {
    const reduxStore = store.getState();
    const propertyState = reduxStore.property;
    const { currentPropertyList } = propertyState;
    const { page, limit } = propertyState.filterParamsProperty;
    const propertyListPagination = currentPropertyList.slice(
      (page - 1) * limit,
      page * limit
    );
    dispatch(setPropertyListWithPagination(propertyListPagination));
  }
);

export const setFilterParamsPropertyAsync = createAsyncThunk<
  void,
  Partial<PropertyFilterParams>
>("property/set-filter-params", async (params, { dispatch }) => {
  const reduxStore = store.getState();
  const currentPropertyParams = reduxStore.property.filterParamsProperty;
  dispatch(setFilterParamsProperty({ ...currentPropertyParams, ...params }));
});

export const filterPropertyBySearchAsync = createAsyncThunk<void, string>(
  "property/filter-by-search",
  async (search, { dispatch }) => {
    const reduxStore = store.getState();
    const propertyState = reduxStore.property;
    const propertyList = propertySelectors.selectAll(reduxStore);
    const { currentPropertyList } = propertyState;
    dispatch(setFilterParamsPropertyAsync({ search: search }));
    if (!search) {
      dispatch(setCurrentPropertyList(propertyList));
      return;
    }
    const newListProperty = currentPropertyList.filter((item) =>
      FilterService.isTextIncludedIn(item.name, search)
    );

    dispatch(setCurrentPropertyList(newListProperty));
  }
);

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setFilterParamsProperty(
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
  setFilterParamsProperty,
  setCurrentPropertyList,
  setPropertyListWithPagination,
} = propertySlice.actions;
export default propertySlice.reducer;
