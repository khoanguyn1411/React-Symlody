import React, { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

import { TToggleModal } from "@/components";

type TContext = {
  resetFn: any;
  setResetFn: React.Dispatch<any>;
  toggle: TToggleModal;
};

const ModalMultipleTabsContext = createContext<TContext>({
  resetFn: undefined,
  setResetFn: undefined,
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
  const [resetFn, setResetFn] = useState(undefined);
  const value = { resetFn, setResetFn, toggle };
  return (
    <ModalMultipleTabsContext.Provider value={value}>
      {children}
    </ModalMultipleTabsContext.Provider>
  );
};

function useModalMultipleTabsContext(): TContext {
  const context = useContext(ModalMultipleTabsContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within modal context.");
  }
  return context;
}

export { ModalMultipleTabsProvider, useModalMultipleTabsContext };
