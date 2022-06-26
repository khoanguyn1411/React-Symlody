import React, { ReactNode } from "react";

import { Header, Sidebar } from "@/components";

type TProps = {
  children: ReactNode;
};

export const MainLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};
