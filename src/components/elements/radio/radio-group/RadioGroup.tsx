import { Fragment, memo } from "react";

import {
  RadioGroupProvider,
  TRadioGroupProvider,
  useRadioGroupContext,
} from "../context";
import { Radio, RadioInput } from "../radio-components";

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
    <div className="flex flex-col space-y-1">
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
