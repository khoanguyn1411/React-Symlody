import { Fragment, memo } from "react";

import { Radio, RadioInput } from "@/components";

import {
  RadioGroupProvider,
  TRadioGroupProvider,
  useRadioGroupContext,
} from "../context";

const _RadioGroup: React.FC<TRadioGroupProvider> = (props) => {
  return (
    <RadioGroupProvider {...props}>
      <RadioGroupContent />
    </RadioGroupProvider>
  );
};

const _RadioGroupContent: React.FC = () => {
  const { listNormalRadios, isHaveOther, labelOther } = useRadioGroupContext();
  return (
    <div className="flex flex-col">
      {listNormalRadios.map((item) => (
        <Fragment key={item}>
          <Radio value={item} />
        </Fragment>
      ))}
      {isHaveOther && <RadioInput value="Other" label={labelOther} />}
    </div>
  );
};

export const RadioGroup = memo(_RadioGroup);
const RadioGroupContent = memo(_RadioGroupContent);
