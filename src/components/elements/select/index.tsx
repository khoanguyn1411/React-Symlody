import { onChange } from "@material-tailwind/react/types/components/select";
import React from "react";

type TProps = {
  data: string[];
  label: string;
  onChange: onChange;
  value: string;
};

export const Select: React.FC<TProps> = ({ data, label, onChange, value }) => {
  console.log(value);
  return <div className="w-60"></div>;
};
