import { createEntityAdapter } from "@reduxjs/toolkit";

import { IProperty } from "@/features/types";

export interface PropertiesStateInner {
  pending: boolean;
}

export const propertyAdapter = createEntityAdapter<IProperty>({
  selectId: (member) => member.id,
});

export const initialState =
  propertyAdapter.getInitialState<PropertiesStateInner>({
    pending: false,
  });

export type PropertyState = typeof initialState;
