import { memo } from "react";

import { GlobalTypes } from "@/types";

export const _Title: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center flex-1">
      <h1 className="mr-4 font-bold min-w-max"> {children}</h1>
    </div>
  );
};

export const Title = memo(_Title);
