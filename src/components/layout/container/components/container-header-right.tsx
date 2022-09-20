import { memo } from "react";

import { GlobalTypes } from "@/types";

const _HeaderRight: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center justify-center space-x-4">{children}</div>
  );
};

export const HeaderRight = memo(_HeaderRight);
