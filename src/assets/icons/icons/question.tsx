import React from "react";

import { SvgWrapper } from "../icon-wrapper";
import { TIconProps } from "../type";

export const Question: React.FC<TIconProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 0.5C4.97656 0.5 0.5 4.97656 0.5 10.5C0.5 16.0234 4.97656 20.5 10.5 20.5C16.0234 20.5 20.5 16.0234 20.5 10.5C20.5 4.97656 16.0234 0.5 10.5 0.5ZM10.5 16.125C9.79688 16.125 9.25 15.5781 9.25 14.875C9.25 14.1719 9.76172 13.625 10.5 13.625C11.168 13.625 11.75 14.1719 11.75 14.875C11.75 15.5781 11.168 16.125 10.5 16.125ZM13.1992 10.5781L11.4375 11.6719V11.75C11.4375 12.2578 11.0078 12.6875 10.5 12.6875C9.99219 12.6875 9.5625 12.2578 9.5625 11.75V11.125C9.5625 10.8125 9.71875 10.5 10.0312 10.3047L12.2578 8.97656C12.5312 8.82031 12.6875 8.54688 12.6875 8.23438C12.6875 7.76562 12.2617 7.375 11.793 7.375H9.79688C9.29297 7.375 8.9375 7.76562 8.9375 8.23438C8.9375 8.74219 8.50781 9.17188 8 9.17188C7.49219 9.17188 7.0625 8.74219 7.0625 8.23438C7.0625 6.71094 8.27344 5.5 9.76172 5.5H11.7578C13.3516 5.5 14.5625 6.71094 14.5625 8.23438C14.5625 9.17188 14.0547 10.0703 13.1992 10.5781Z"
        fill="currentColor"
      />
    </SvgWrapper>
  );
};