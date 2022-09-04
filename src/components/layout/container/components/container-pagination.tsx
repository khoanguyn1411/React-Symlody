import React from "react";

import { Pagination as AppPagination } from "@/components";
import { TPropsPagination } from "@/components/elements/pagination/context";

type TProps = Omit<TPropsPagination, "totalPages" | "pageStep">;

export const Pagination: React.FC<TProps> = (props) => {
  return (
    <div className="flex justify-end w-full mt-5">
      <AppPagination {...props} totalPages={150} pageStep={1} />
    </div>
  );
};