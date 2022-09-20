import { memo } from "react";

import { GlobalTypes } from "@/types";

const _TableHead: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <thead className="sticky top-0 z-10 bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableHead = memo(_TableHead);
