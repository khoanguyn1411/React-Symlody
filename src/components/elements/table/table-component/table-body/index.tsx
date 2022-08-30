import React, { ReactNode } from "react";
type TProps = {
  children: ReactNode;
};
export const TableBody: React.FC<TProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
