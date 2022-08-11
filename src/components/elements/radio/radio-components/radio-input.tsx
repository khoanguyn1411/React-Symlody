import React, { ChangeEvent, useEffect, useState } from "react";

import { InputUnderLine, Radio } from "@/components";

import { useRadioGroupContext } from "../context";

type TProps = {
  value: string;
  label?: string;
};
export const RadioInput: React.FC<TProps> = ({ value, label }) => {
  const { checked, setActiveValue, listNormalRadios, activeValue } =
    useRadioGroupContext();
  const [inputValue, setInputValue] = useState<string>(
    listNormalRadios.includes(activeValue) ? "" : activeValue
  );
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!listNormalRadios.includes(activeValue)) {
      setActiveValue(event.target.value);
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
          disable={
            !activeValue && !checked
              ? true
              : listNormalRadios.includes(activeValue)
          }
        />
      </Radio>
    </div>
  );
};
