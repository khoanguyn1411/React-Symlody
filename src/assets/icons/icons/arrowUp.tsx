import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const ArrowUp: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 8"
    >
      <path
        d="M0.29303 6.29294L1.70703 7.70694L6.00003 3.41394L10.293 7.70694L11.707 6.29294L6.00003 0.585938L0.29303 6.29294Z"
        fill="currentColor"
      />
    </SvgWrapper>
  );
};
