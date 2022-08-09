import React from "react";

import { InputUnderLine } from "../../input";
import { Radio } from "../radio-item";

export const RadioGroup: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Radio>adasds</Radio>
      <Radio>asd</Radio>
      <Radio>fafafa</Radio>
      <Radio>afsafs</Radio>
      <Radio>asff</Radio>
      <Radio>
        <InputUnderLine />
      </Radio>
    </div>
  );
};
