import { Button as ButtonMaterial } from "@material-tailwind/react";
import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
};

export const Button: React.FC<TProps> = ({
  onClick,
  className = "",
  children,
}) => {
  return (
    <ButtonMaterial
      color="blue-grey"
      className={classNames(
        "rounded-lg transition-all py-2 normal-case font-bold text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </ButtonMaterial>
  );
};
