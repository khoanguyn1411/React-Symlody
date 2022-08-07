import React, { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export const ModalBody: React.FC<TProps> = ({ children }) => {
  return <div className="px-5 pt-5 overflow-auto">{children}</div>;
};
