import { forwardRef } from "react";

import { Input } from "../../input";
import { TStyle } from "../type";

// eslint-disable-next-line react/display-name
export const CustomInput = forwardRef<
  HTMLButtonElement,
  {
    onChange?: (value: string) => void;
    value?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style: TStyle;
    placeHolder: string;
  }
>(({ onChange, value, onClick, style, placeHolder }, ref) => {
  return (
    <button onClick={onClick} type="button" ref={ref} className="w-full">
      <Input
        placeholder={placeHolder}
        style={style}
        value={value}
        onChange={onChange}
      />
    </button>
  );
});
