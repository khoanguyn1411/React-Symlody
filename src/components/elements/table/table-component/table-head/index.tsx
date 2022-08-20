import React, { ReactNode } from "react";
type TProps = {
  children: ReactNode;
};

export const TableHead: React.FC<TProps> = ({ children }) => {
  return (
    <thead className="bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
