import { memo } from "react";

import { GlobalTypes } from "@/types";

const _Header: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center justify-between h-16 py-3 bg-white border-b border-gray-200 px-default">
      {children}
    </div>
  );
};

export const Header = memo(_Header);
