import React, { createContext, ReactNode, useContext } from "react";

import { TPropsModalMultipleTabs } from "../types";

type TModalMultipleTabsProvider = {
  children: ReactNode;
} & TPropsModalMultipleTabs;

const ModalMultipleTabsContext = createContext<TPropsModalMultipleTabs>({
  renderTabs: [],
  size: "sm",
  isShowing: false,
  toggle: undefined,
});

const ModalMultipleTabsProvider: React.FC<TModalMultipleTabsProvider> = ({
  children,
  ...props
}) => {
  return (
    <ModalMultipleTabsContext.Provider value={props}>
      {children}
    </ModalMultipleTabsContext.Provider>
  );
};

const useModalMultipleTabsContext = (): TPropsModalMultipleTabs => {
  const context = useContext(ModalMultipleTabsContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within modal context.");
  }
  return context;
};

export { ModalMultipleTabsProvider, useModalMultipleTabsContext };
