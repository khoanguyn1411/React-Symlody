import { Button as ButtonMaterial } from "@material-tailwind/react";
import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  style?: "outline" | "default" | "none";
};

export const Button: React.FC<TProps> = ({
  onClick,
  className = "",
  children,
  type = "button",
  style = "default",
}) => {
  return (
    <ButtonMaterial
      color="blue-grey"
      type={type}
      className={classNames(
        "rounded-lg transition-all min-w-max duration-200 text-default border-2 py-2 normal-case font-bold",
        className,
        {
          "border-primary-800 bg-primary-800 hover:bg-primary-900 hover:border-primary-900 text-white":
            style === "default",
          "border-primary-800 bg-white text-primary-800": style === "outline",
        }
      )}
      onClick={onClick}
    >
      {children}
    </ButtonMaterial>
  );
};
