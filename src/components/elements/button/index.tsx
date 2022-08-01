import classNames from "classnames";
import React, { ReactNode } from "react";

type TProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  style?: "outline" | "default" | "none";
  isIconOnly?: boolean;
};

export const Button: React.FC<TProps> = ({
  onClick,
  className = "",
  children,
  type = "button",
  style = "default",
  isIconOnly = false,
}) => {
  return (
    <button
      color="blue-grey"
      type={type}
      className={classNames(
        "rounded-lg text-center flex items-center justify-center transition-all min-w-max duration-200 text-default border-2 normal-case font-bold",
        className,
        {
          "border-primary-800 bg-primary-800 hover:bg-primary-900 hover:border-primary-900 text-white":
            style === "default",
          "border-primary-800 bg-white text-primary-800": style === "outline",
          "px-2 py-2 min-w-[80px]": !isIconOnly,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>

    // <ButtonMaterial
    //   color="blue-grey"
    //   type={type}
    //   className={classNames(
    //     "rounded-lg transition-all min-w-max duration-200 text-default border-2 py-2 normal-case font-bold",
    //     className,
    //     {
    //       "border-primary-800 bg-primary-800 hover:bg-primary-900 hover:border-primary-900 text-white":
    //         style === "default",
    //       "border-primary-800 bg-white text-primary-800": style === "outline",
    //     }
    //   )}
    //   onClick={onClick}
    // >
    //   {children}
    // </ButtonMaterial>
  );
};
