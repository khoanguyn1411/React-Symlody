import React, { memo } from "react";

export const _PaginationDot: React.FC = () => {
  return <i className="px-2">...</i>;
};

export const PaginationDot = memo(_PaginationDot);
