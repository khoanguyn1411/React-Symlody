import React, { createContext, ReactNode, useContext, useState } from "react";

type TContextRadioGroup = {
  activeValue: string;
  checked: string;
  listNormalRadios?: readonly string[];
  setActiveValue: (value: string) => void;
  setChecked: (value: string) => void;
};

const RadioGroupContext = createContext<TContextRadioGroup>({
  activeValue: "",
  checked: "",
  listNormalRadios: [],
  setActiveValue: undefined,
  setChecked: undefined,
});
export type TRadioGroupProvider = {
  children: ReactNode;
  activeValue: string;
  listNormalRadios?: readonly string[];
  setActiveValue: (value: string) => void;
};
const RadioGroupProvider: React.FC<TRadioGroupProvider> = ({
  children,
  ...props
}) => {
  const [checked, setChecked] = useState<string>(props.activeValue);
  const value = { checked, setChecked, ...props };
  return (
    <RadioGroupContext.Provider value={value}>
      {children}
    </RadioGroupContext.Provider>
  );
};

const useRadioGroupContext = (): TContextRadioGroup => {
  const context = useContext(RadioGroupContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within radio group context.");
  }
  return context;
};

export { RadioGroupProvider, useRadioGroupContext };