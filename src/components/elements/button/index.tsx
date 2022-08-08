import classNames from "classnames";
import React, { ReactNode } from "react";

type TLoading = {
  active: boolean;
};

type TProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
<<<<<<< HEAD
  style?: "outline" | "default" | "none" | "disable";
  isIconOnly?: boolean;
  prefix?: ReactNode | null;
  isShowLoading?: TLoading | null;
=======
  style?: "outline" | "default" | "none";
  isIconOnly?: boolean;
>>>>>>> feature/club151
};

export const Button: React.FC<TProps> = ({
  onClick,
  className = "",
  children,
  type = "button",
  style = "default",
  isIconOnly = false,
<<<<<<< HEAD
  prefix = null,
  isShowLoading = null,
=======
>>>>>>> feature/club151
}) => {
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (style === "disable") {
      return;
    }
    onClick && onClick(event);
  };
  return (
    <button
<<<<<<< HEAD
      type={type}
      className={classNames(
        "rounded-lg text-center flex items-center justify-center transition-all min-w-max duration-200 text-default border-[1.5px] normal-case font-bold",
=======
      color="blue-grey"
      type={type}
      className={classNames(
        "rounded-lg text-center flex items-center justify-center transition-all min-w-max duration-200 text-default border-2 normal-case font-bold",
>>>>>>> feature/club151
        className,
        {
          "border-primary-800 bg-primary-800 hover:bg-primary-900 hover:border-primary-900 text-white":
            style === "default",
          "border-primary-300 bg-primary-300 text-white cursor-default":
            style === "disable",
          "border-primary-800 bg-white text-primary-800": style === "outline",
          "px-2 py-2 min-w-[80px]": !isIconOnly,
        }
      )}
      onClick={handleOnClick}
    >
      {isShowLoading && (
        <i
          className={classNames(
            "mr-3 fas hidden fa-spinner-third animate-spin transition-all duration-300",
            { "before:hidden mr-0": !isShowLoading.active }
          )}
        ></i>
      )}
      {prefix}
      {children}
    </button>
<<<<<<< HEAD
=======

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
>>>>>>> feature/club151
  );
};
