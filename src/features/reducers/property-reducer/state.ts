import { createEntityAdapter } from "@reduxjs/toolkit";

import { APP_PAGINATION } from "@/components/elements/pagination/constants";
import { Property } from "@/features/types";
import { PropertyFilterParams } from "@/features/types/models/filter-params";

export interface PropertiesStateInner {
  pending: boolean;
  filterParamsProperty: PropertyFilterParams;
  pendingRestoreProperty: boolean;
  pendingDeleteProperty: boolean;

  // Used for pagination and searching in front-end.
  currentPropertyList: Property[];
  propertyListPagination: Property[];
}

export const propertyAdapter = createEntityAdapter<Property>({
  selectId: (property) => property.id,
});

export const initialState =
  propertyAdapter.getInitialState<PropertiesStateInner>({
    pending: false,
    pendingRestoreProperty: false,
    pendingDeleteProperty: false,
    filterParamsProperty: {
      isArchived: false,
      page: 1,
      limit: APP_PAGINATION.DEFAULT_PAGINATION_LIMIT,
      search: "",
    },

    // Used for pagination and searching in front-end.
    currentPropertyList: [],
    propertyListPagination: [],
  });

export type PropertyState = typeof initialState;
