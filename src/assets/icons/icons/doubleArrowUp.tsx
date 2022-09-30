import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const DoubleArrowUp: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.40323 13.4242L0.990234 12.0092L7.00023 5.99822L13.0102 12.0092L11.5972 13.4222L6.99723 8.82222L2.39723 13.4222L2.40323 13.4242ZM2.40323 8.00022L0.990234 6.58422L7.00023 0.574219L13.0102 6.58422L11.5972 7.99822L6.99723 3.39822L2.39723 7.99822L2.40323 8.00022Z"
        fill="#FF5630"
      />
    </SvgWrapper>
  );
};
