import React from "react";

import { GlobalTypes } from "@/utils";

type TProps = {
  zIndex: number;
};

export const TodoCircleBorderWrapper: GlobalTypes.FCPropsWithChildren<
  TProps
> = ({ children, zIndex }) => {
  return (
    <div
      style={{ zIndex: zIndex }}
      className="border-white rounded-full cursor-pointer border-[1.8px]"
    >
      {children}
    </div>
  );
};
