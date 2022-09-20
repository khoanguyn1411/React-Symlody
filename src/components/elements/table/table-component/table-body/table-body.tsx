import { memo } from "react";

import { GlobalTypes } from "@/types";

const _TableBody: GlobalTypes.FCChildren = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableBody = memo(_TableBody);
