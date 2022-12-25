import React from "react";

import { AppReact } from "@/utils/types";

type TProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const ConfigTabContentContainer: AppReact.FC.PropsWithChildren<
  TProps
> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-5 bg-white border border-gray-200 rounded-md"
    >
      {children}
    </form>
  );
};
