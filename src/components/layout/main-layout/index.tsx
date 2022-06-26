import React, { ReactNode } from "react";

import { Header, Sidebar } from "@/components";

type TProps = {
  children: ReactNode;
};

export const MainLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar className="w-1/5 h-screen overflow-auto border-r-2 border-grey-200 min-w-[256px]" />
      <div className="flex-1 ">
        <Header className="w-full bg-blue-grey-50" />
        <div className="p-5 overflow-auto h-[calc(100vh_-_4rem)] bg-[#FBFBFB]">
          {children}
        </div>
      </div>
    </div>
  );
};
