import { createEntityAdapter } from "@reduxjs/toolkit";

import { IProperty } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

export interface PropertiesStateInner {
  pending: boolean;
  listQueryProperty: TPropertyParamQueryDto;
}

export const propertyAdapter = createEntityAdapter<IProperty>({
  selectId: (member) => member.id,
});

export const initialState =
  propertyAdapter.getInitialState<PropertiesStateInner>({
    pending: false,
    listQueryProperty: { is_archived: false },
  });

export type PropertyState = typeof initialState;
