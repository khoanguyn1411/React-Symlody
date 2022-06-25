import React from "react";

type TProps = {
  className?: string;
};

export const Header: React.FC<TProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex items-center h-16 text-white bg-primary-800">
        <h1 className="w-full font-bold text-center">HEADER</h1>
      </div>
    </div>
  );
};
