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

export const PaginationContent: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex items-center border border-black rounded-md">
        <PaginationList />
        <div className="flex border-l border-black place-self-stretch">
          <PaginationPickPage />
        </div>
      </div>

      <div className="ml-8">
        <PaginationPickRows />
      </div>
    </div>
  );
};
