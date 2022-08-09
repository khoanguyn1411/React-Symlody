import { ReactNode } from "react";

import { RadioGroupProvider, TRadioGroupProvider } from "../context";

export const RadioGroup: React.FC<TRadioGroupProvider> = ({
  children,
  ...props
}) => {
  return (
    <RadioGroupProvider {...props}>
      <RadioGroupContent>{children}</RadioGroupContent>
    </RadioGroupProvider>
  );
};

export const RadioGroupContent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="flex flex-col">{children}</div>;
};
