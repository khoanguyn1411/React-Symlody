import React, { ReactNode } from "react";

import { Header } from "../header";
import { Sidebar } from "../sidebar";

type TProps = {
  children: ReactNode;
};

export const MainLayout: React.FC<TProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="transition-all duration-300 xl:pl-sidebar">
        <main className="bg-gray-50">{children}</main>
      </div>
    </>
  );
};
