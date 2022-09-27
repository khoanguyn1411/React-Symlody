import { Fragment } from "react";

import {
  RadioGroupProvider,
  TRadioGroupProvider,
  useRadioGroupContext,
} from "../context";
import { Radio, RadioInput } from "../radio-components";

export const RadioGroup: React.FC<TRadioGroupProvider> = (props) => {
  return (
    <RadioGroupProvider {...props}>
      <RadioGroupContent />
    </RadioGroupProvider>
  );
};

const RadioGroupContent: React.FC = () => {
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
