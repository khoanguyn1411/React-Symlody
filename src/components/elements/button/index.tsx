import { Button as ButtonMaterial } from "@material-tailwind/react";
import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<TProps> = ({
  onClick,
  className = "",
  children,
  type = "button",
}) => {
  return (
    <ButtonMaterial
      color="blue-grey"
      type={type}
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
