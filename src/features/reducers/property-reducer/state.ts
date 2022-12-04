import { createEntityAdapter } from "@reduxjs/toolkit";

import { APP_PAGINATION } from "@/constants";
import { Property } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/filter-params";
import { GlobalTypes } from "@/utils";

export interface PropertiesStateInner {
  pending: boolean;
  listQueryProperty: TPropertyParamQueryDto;
  pendingRestoreProperty: boolean;
  pendingDeleteProperty: boolean;

  // Used for pagination and searching in front-end.
  currentPropertyList: Property[];
  listQueryPropertyFE: GlobalTypes.StrictOmit<
    TPropertyParamQueryDto,
    "is_archived"
  >;
  propertyListPagination: Property[];
}

export const propertyAdapter = createEntityAdapter<Property>({
  selectId: (property) => property.id,
});

export const initialState =
  propertyAdapter.getInitialState<PropertiesStateInner>({
    pending: false,
    listQueryProperty: { is_archived: false },
    pendingRestoreProperty: false,
    pendingDeleteProperty: false,

    // Used for pagination and searching in front-end.
    currentPropertyList: [],
    propertyListPagination: [],
    listQueryPropertyFE: {
      page: 1,
      limit: APP_PAGINATION.DEFAULT_PAGINATION_LIMIT,
      search: "",
    },
  });

export type PropertyState = typeof initialState;
