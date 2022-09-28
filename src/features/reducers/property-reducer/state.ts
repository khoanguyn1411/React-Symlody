import { createEntityAdapter } from "@reduxjs/toolkit";

import { APP_PAGINATION } from "@/constants";
import { IProperty } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";
import { GlobalTypes } from "@/utils";

export interface PropertiesStateInner {
  pending: boolean;
  listQueryProperty: TPropertyParamQueryDto;
  pendingRestoreProperty: boolean;
  pendingDeleteProperty: boolean;

  // Used for pagination and searching in front-end.
  currentPropertyList: IProperty[];
  listQueryPropertyFE: GlobalTypes.StrictOmit<
    TPropertyParamQueryDto,
    "is_archived"
  >;
  propertyListPagination: IProperty[];
}

export const propertyAdapter = createEntityAdapter<IProperty>({
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
