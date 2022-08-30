import React, { ReactNode } from "react";
type TProps = {
  children: ReactNode;
};

export const TableHead: React.FC<TProps> = ({ children }) => {
  return (
    <thead className="sticky top-0 z-10 bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
