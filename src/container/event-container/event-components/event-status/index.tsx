import classNames from "classnames";
import React from "react";

import { EEventStatus } from "../../constant";
import { TYPE_MAP } from "./type";

type TProps = {
  children: EEventStatus;
};

export const Status: React.FC<TProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        "rounded-lg border min-w-max font-medium w-[fit-content] px-2.5 py-1.5",
        TYPE_MAP[children]
      )}
    >
      {children}
    </div>
  );
};
