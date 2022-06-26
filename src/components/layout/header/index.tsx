import classNames from "classnames";
import React from "react";

type TProps = {
  className?: string;
};

export const Header: React.FC<TProps> = ({ className }) => {
  return (
    <header
      className={classNames(
        "flex items-center h-header sticky top-0 ml-0 xl:ml-sidebar text-white bg-primary-800",
        className
      )}
    >
      <h1 className="font-bold">HEADER</h1>
    </header>
  );
};
