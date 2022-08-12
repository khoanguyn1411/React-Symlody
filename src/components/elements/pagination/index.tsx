import React from "react";

import { PaginationProvider, TPropsPagination } from "./context";
import {
  PaginationList,
  PaginationPickPage,
  PaginationPickRows,
} from "./pagination-component";

export const Pagination: React.FC<TPropsPagination> = (props) => {
  return (
    <PaginationProvider {...props}>
      <PaginationContent />
    </PaginationProvider>
  );
};

const PaginationContent: React.FC = () => {
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
