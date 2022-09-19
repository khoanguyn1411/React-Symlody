import React, { useEffect, useState } from "react";

import { InputUnderLine, Radio } from "@/components";

import { useRadioGroupContext } from "../context";

type TProps = {
  value: string;
  label?: string;
};
export const RadioInput: React.FC<TProps> = ({ value, label }) => {
  const { setActiveValue, setChecked, listNormalRadios, activeValue, checked } =
    useRadioGroupContext();
  const [inputValue, setInputValue] = useState<string>(
    listNormalRadios.includes(activeValue) ? "" : activeValue
  );
  const handleChangeValue = (_value: string) => {
    setInputValue(_value);
    setChecked(value);
    if (!listNormalRadios.includes(activeValue)) {
      setActiveValue(_value);
    }
  };

  useEffect(() => {
    if (activeValue == null) {
      setChecked("");
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue]);

  useEffect(() => {
    if (checked === value) {
      setActiveValue(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div>
      <Radio
        value={value}
        isChecked={
          activeValue !== undefined
            ? !listNormalRadios.includes(activeValue)
            : undefined
        }
      >
        <InputUnderLine
          onChange={handleChangeValue}
          value={inputValue}
          label={label}
        />
      </Radio>
    </div>
  );
};
