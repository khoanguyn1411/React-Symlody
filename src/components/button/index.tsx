import { Button as ButtonMeterial } from "@material-tailwind/react";
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
    <ButtonMeterial
      color="blue-grey"
      className={`rounded-lg hover:bg-primary-900 hover:transition-all transition-all py-2 normal-case text-[1rem] font-bold text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </ButtonMeterial>
  );
};
