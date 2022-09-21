import React, { memo } from "react";

import { PaginationProvider, TPropsPagination } from "./context";
import {
  PaginationList,
  PaginationPickPage,
  PaginationPickRows,
} from "./pagination-component";

const _Pagination: React.FC<TPropsPagination> = (props) => {
  return (
    <PaginationProvider {...props}>
      <PaginationContent />
    </PaginationProvider>
  );
};

const _PaginationContent: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center bg-white border border-gray-300 h-[fit-content] rounded-md">
        <PaginationList />
        <PaginationPickPage />
      </div>
      <PaginationPickRows />
    </div>
  );
};

export const Pagination = memo(_Pagination);
const PaginationContent = memo(_PaginationContent);
