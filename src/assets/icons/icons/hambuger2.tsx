import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const Hamburger2: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 8"
    >
      <path d="M14 2H0V0H14V2ZM14 8H0V6H14V8Z" fill="currentColor" />
    </SvgWrapper>
  );
};
