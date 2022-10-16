import React from "react";

import { CSSService, GlobalTypes } from "@/utils";

export const HeaderForTabHost: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div
      style={{ top: CSSService.getCSSVar("header-height") }}
      className="sticky top-0 flex items-end justify-between h-16 bg-white border-b border-gray-200 z-[2] px-default"
    >
      {children}
    </div>
  );
};
