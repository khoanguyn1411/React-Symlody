import React from "react";

import { GlobalTypes } from "@/utils";

export const ConfigSplitColumn: GlobalTypes.FCChildren = ({ children }) => {
  return <div className="mt-8 grid grid-cols-2 gap-4">{children}</div>;
};
