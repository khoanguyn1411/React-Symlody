import React from "react";

type TProps = {
  className?: string;
};

export const Header: React.FC<TProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center h-16 text-white bg-primary-800 w-full ${className}"`}
    >
      <h1 className="font-bold">HEADER</h1>
    </div>
  );
};
