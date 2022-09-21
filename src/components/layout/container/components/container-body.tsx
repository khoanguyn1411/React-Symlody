import { memo } from "react";

import { GlobalTypes } from "@/types";

const _Body: GlobalTypes.FCChildren = ({ children }) => {
  return <div className="p-default">{children}</div>;
};

export const Body = memo(_Body);
