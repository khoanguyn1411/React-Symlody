import React, { ChangeEvent, useEffect, useState } from "react";

import { InputUnderLine, Radio } from "@/components";

import { useRadioGroupContext } from "../context";

type TProps = {
  defaultChecked?: boolean;
  value: string;
};
export const RadioInput: React.FC<TProps> = ({ defaultChecked, value }) => {
  const { checked, setActiveValue } = useRadioGroupContext();

  const [inputValue, setInputValue] = useState<string>();
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (checked === value) {
      setActiveValue(e.target.value);
    }
  };

  useEffect(() => {
    if (checked === value) {
      setActiveValue(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div>
      <Radio defaultChecked={defaultChecked} value={value} type={"input"}>
        <InputUnderLine
          onChange={handleChangeValue}
          value={inputValue}
          disable={value !== checked}
        />
      </Radio>
    </div>
  );
};
