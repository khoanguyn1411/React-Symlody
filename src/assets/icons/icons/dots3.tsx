import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const Dots3: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      viewBox="0 0 16 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.28571 2C4.28571 3.10357 3.39035 4 2.28571 4C1.18106 4 0.285706 3.10357 0.285706 2C0.285706 0.896429 1.18106 0 2.28571 0C3.39035 0 4.28571 0.896429 4.28571 2ZM9.99999 2C9.99999 3.10357 9.10356 4 7.99999 4C6.89642 4 5.99999 3.10357 5.99999 2C5.99999 0.896429 6.89642 0 7.99999 0C9.10356 0 9.99999 0.896429 9.99999 2ZM11.7143 2C11.7143 0.896429 12.6107 0 13.7143 0C14.8178 0 15.7143 0.896429 15.7143 2C15.7143 3.10357 14.8178 4 13.7143 4C12.6107 4 11.7143 3.10357 11.7143 2Z"
        fill="#455A64"
        fillOpacity="0.7"
      />
    </SvgWrapper>
  );
};
