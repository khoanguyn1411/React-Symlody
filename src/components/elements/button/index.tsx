import { Button as ButtonMaterial } from "@material-tailwind/react";
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
      className={`rounded-lg hover:bg-primary-900 transition-all py-2 normal-case font-bold text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </ButtonMaterial>
  );
};
