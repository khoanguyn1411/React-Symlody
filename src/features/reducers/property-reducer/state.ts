import { createEntityAdapter } from "@reduxjs/toolkit";

import { IProperty } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

export interface PropertiesStateInner {
  pending: boolean;
  listQueryProperty: TPropertyParamQueryDto;
  pendingRestoreProperty: boolean;
  propertyListPagination: IProperty[];
  pendingDeleteProperty: boolean;
}

export const propertyAdapter = createEntityAdapter<IProperty>({
  selectId: (property) => property.id,
});

export const initialState =
  propertyAdapter.getInitialState<PropertiesStateInner>({
    pending: false,
    propertyListPagination: [],
    listQueryProperty: { is_archived: false },
    pendingRestoreProperty: false,
    pendingDeleteProperty: false,
  });

export type PropertyState = typeof initialState;
