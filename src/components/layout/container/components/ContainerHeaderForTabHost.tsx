import React from "react";

import { GlobalTypes } from "@/utils";

export const HeaderForTabHost: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="sticky flex items-end justify-between h-16 bg-white border-b border-gray-200  z-[2] px-default">
      {children}
    </div>
  );
};
