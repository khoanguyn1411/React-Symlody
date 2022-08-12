import { ReactNode } from "react";

import { RadioGroupProvider, TRadioGroupProvider } from "../context";

/**
 * - Please provide a list of normal radio buttons if you have a "RadioInput" component.
 * Otherwise, it is unnecessary to provide such list.
 * - Every RadioGroup should only have a RadioInput, or else it will cause a bug.
 * @example
 * <RadioGroup
    listNormalRadios={["Câu lạc bộ"]}
    activeValue={value}
    setActiveValue={onChange}
    >
      <Radio value={"Câu lạc bộ"} />
      <RadioInput value={"Khác"} />
    </RadioGroup>
 */
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
