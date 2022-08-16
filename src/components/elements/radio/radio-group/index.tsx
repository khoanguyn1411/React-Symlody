import { Fragment } from "react";

import { Radio, RadioInput } from "@/components";

import {
  RadioGroupProvider,
  TRadioGroupProvider,
  useRadioGroupContext,
} from "../context";

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
