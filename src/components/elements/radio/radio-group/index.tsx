import { Fragment } from "react";

import { Radio, RadioInput } from "@/components";

import {
  RadioGroupProvider,
  TRadioGroupProvider,
  useRadioGroupContext,
} from "../context";

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
export const RadioGroup: React.FC<TRadioGroupProvider> = (props) => {
  return (
    <RadioGroupProvider {...props}>
      <RadioGroupContent />
    </RadioGroupProvider>
  );
};

export const RadioGroupContent: React.FC = () => {
  const { listNormalRadios, isHaveOther, labelOther } = useRadioGroupContext();
  return (
    <div className="flex flex-col">
      {listNormalRadios.map((item, index) => (
        <Fragment key={index}>
          <Radio value={item} />
        </Fragment>
      ))}
      {isHaveOther && <RadioInput value="Other" label={labelOther} />}
    </div>
  );
};
