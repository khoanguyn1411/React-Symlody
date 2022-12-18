import React from "react";

import { AppReact } from "@/utils/types";

type TProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const ConfigTabContentContainer: AppReact.FC.PropsWithChildren<
  TProps
> = ({ children, onSubmit }) => {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-md">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};
