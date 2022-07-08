import React, { ReactNode } from "react";

import { Page_Key } from "@/routes";

import { Header } from "../header";
import { Sidebar } from "../sidebar";

type TProps = {
  children: ReactNode;
  pageKey: Page_Key;
};

export const MainLayout: React.FC<TProps> = ({ children, pageKey }) => {
  return (
    <div className="min-h-screen bg-grey-50">
      <Header />
      <Sidebar pageKey={pageKey} />
      <div className="transition-all duration-300 xl:pl-sidebar">
        <main>{children}</main>
      </div>
    </div>
  );
};
