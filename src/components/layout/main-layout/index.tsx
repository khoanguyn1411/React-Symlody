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
    <>
      <Header />
      <Sidebar pageKey={pageKey} />
      <div className="transition-all duration-300 xl:pl-sidebar">
        <main className="bg-gray-50">{children}</main>
      </div>
    </>
  );
};
