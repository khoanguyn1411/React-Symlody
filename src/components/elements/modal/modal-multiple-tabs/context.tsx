import React, { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

import { TToggleModal } from "@/components";

type TContext = {
  toggle: TToggleModal;
};

const ModalMultipleTabsContext = createContext<TContext>({
  toggle: undefined,
});

type TModalMultipleTabsProvider = {
  children: ReactNode;
  toggle: TToggleModal;
};
const ModalMultipleTabsProvider: React.FC<TModalMultipleTabsProvider> = ({
  children,
  toggle,
}) => {
  const value = { toggle };
  return (
    <ModalMultipleTabsContext.Provider value={value}>
      {children}
    </ModalMultipleTabsContext.Provider>
  );
};

const useModalMultipleTabsContext = (): TContext => {
  const context = useContext(ModalMultipleTabsContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within modal context.");
  }
  return context;
};

export { ModalMultipleTabsProvider, useModalMultipleTabsContext };
