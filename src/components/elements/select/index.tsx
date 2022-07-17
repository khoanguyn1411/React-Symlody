import { Option, Select as TailwindSelect } from "@material-tailwind/react";
import { onChange } from "@material-tailwind/react/types/components/select";
import classNames from "classnames";
import React from "react";

type TProps = {
  data: string[];
  label: string;
  onChange: onChange;
  value: string;
};

export const Select: React.FC<TProps> = ({ data, label, onChange, value }) => {
  console.log(value);
  return (
    <div className="w-60">
      <TailwindSelect
        label={label}
        variant="outlined"
        onChange={onChange}
        value={value}
        className="bg-white border"
      >
        {data.map((item, index) => (
          <Option
            key={index}
            value={item}
            className={classNames(
              "w-full hover:bg-primary-200 rounded-none ",
              item === value && "bg-primary-200"
            )}
          >
            {item}
          </Option>
        ))}
      </TailwindSelect>
    </div>
  );
};
