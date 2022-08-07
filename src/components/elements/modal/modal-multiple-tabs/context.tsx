import React, { createContext, ReactNode, useContext } from "react";

import { TToggleModal } from "../types";

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
