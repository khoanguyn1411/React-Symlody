import React from "react";

import { GlobalTypes } from "@/utils";

type TProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const ConfigTabContentContainer: GlobalTypes.FCPropsWithChildren<
  TProps
> = ({ children, onSubmit }) => {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-md">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};
