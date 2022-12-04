import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PropertyApi } from "@/api/property-api";
import { RootState, store } from "@/features/store";
import { Property, PropertyCreation, PropertyMapper } from "@/features/types";
import { PropertyFilterParamsMapper } from "@/features/types/mappers/filter-params-mappers";
import { PropertyFilterParams } from "@/features/types/models/filter-params";
import { FilterService, GlobalTypes } from "@/utils";

import { initialState, propertyAdapter } from "./state";

export const getPropertyAsync = createAsyncThunk<
  Property[],
  PropertyFilterParams,
  GlobalTypes.ReduxThunkRejectValue<[]>
>("get/properties", async (param, { rejectWithValue, dispatch }) => {
  const paramDto = PropertyFilterParamsMapper.toDto(param);
  const result = await PropertyApi.getProperties(paramDto);
  if (result.kind === "ok") {
    const propertyList = result.result.map((item) =>
      PropertyMapper.fromDto(item)
    );
    dispatch(setCurrentPropertyList(propertyList));
    return propertyList;
  }
  return rejectWithValue([]);
});

export const createPropertyAsync = createAsyncThunk<
  Property,
  PropertyCreation,
  GlobalTypes.ReduxThunkRejectValue<null>
>("create/property", async (payload, { rejectWithValue }) => {
  const result = await PropertyApi.createProperty(
    PropertyMapper.toFormData(payload)
  );
  if (result.kind === "ok") {
    return PropertyMapper.fromDto(result.result);
  }
  return rejectWithValue(null);
});

export const deletePropertyAsync = createAsyncThunk<
  Property["id"],
  Property["id"],
  GlobalTypes.ReduxThunkRejectValue<null>
>("delete/property", async (id, { rejectWithValue }) => {
  const result = await PropertyApi.deleteProperty(id);
  if (result.kind === "ok") {
    return id;
  }
  return rejectWithValue(null);
});

export const paginatePropertyAsync = createAsyncThunk<void, undefined>(
  "paginate/members",
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

export const filterPropertyBySearch = createAsyncThunk<void, string>(
  "paginate/members",
  async (search, { dispatch }) => {
    const reduxStore = store.getState();
    const propertyState = reduxStore.property;
    const propertyList = propertySelectors.selectAll(reduxStore);
    const { currentPropertyList } = propertyState;
    dispatch(setListQueryProperty(search));
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
    setListQueryProperty(
      state,
      action: PayloadAction<Partial<PropertyFilterParams>>
    ) {
      state.filterParamsProperty = {
        ...state.filterParamsProperty,
        ...action.payload,
      };
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
  setListQueryProperty,
  setCurrentPropertyList,
  setPropertyListWithPagination,
} = propertySlice.actions;
export default propertySlice.reducer;
