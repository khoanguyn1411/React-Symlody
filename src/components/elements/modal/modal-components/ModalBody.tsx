import React, { memo, ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const _ModalBody: React.FC<TProps> = ({ children }) => {
  return <div className="px-5 pt-5 overflow-auto">{children}</div>;
};

export const ModalBody = memo(_ModalBody);
