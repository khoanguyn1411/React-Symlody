import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  heightContainer?: string | number;
};

export const ModalBody: React.FC<TProps> = ({ children, heightContainer }) => {
  return (
    <div
      className="px-5 py-5 overflow-auto"
      style={{ minHeight: heightContainer }}
    >
      {children}
    </div>
  );
};
