import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const Trash: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_859_6344)">
        <path
          d="M5.28125 0.691016C5.49219 0.2675 5.92578 0 6.39844 0H11.1016C11.5742 0 12.0078 0.2675 12.2187 0.691016L12.5 1.25H16.25C16.9414 1.25 17.5 1.80977 17.5 2.5C17.5 3.19023 16.9414 3.75 16.25 3.75H1.25C0.559766 3.75 0 3.19023 0 2.5C0 1.80977 0.559766 1.25 1.25 1.25H5L5.28125 0.691016ZM15.4219 18.207C15.3594 19.2305 14.543 20 13.5508 20H3.94922C2.95898 20 2.13945 19.2305 2.07773 18.207L1.21484 5H16.25L15.4219 18.207Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_859_6344">
          <rect width="17.5" height="20" fill="white" />
        </clipPath>
      </defs>
    </SvgWrapper>
  );
};
