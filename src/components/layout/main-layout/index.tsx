import classNames from "classnames";
import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useAppDispatch, useAppSelector } from "@/features";
import { toggleCompactSidebar } from "@/features/reducers";
import { Page_Key } from "@/routes";

import { Header } from "../header";
import { Sidebar } from "../sidebar";

type TProps = {
  children: ReactNode;
  pageKey: Page_Key;
};

export const MainLayout: React.FC<TProps> = ({ children, pageKey }) => {
  const dispatch = useAppDispatch();
  const commonState = useAppSelector((state) => state.common);

  useHotkeys("b,command+b,ctrl+b", () => {
    dispatch(toggleCompactSidebar());
  });

  const onToggleCompactSidebar = () => {
    dispatch(toggleCompactSidebar());
  };

  return (
    <>
      <Header isCompactSidebar={commonState.isCompactSidebar} />
      <Sidebar
        pageKey={pageKey}
        isCompactSidebar={commonState.isCompactSidebar}
        onToggleCompactSidebar={onToggleCompactSidebar}
      />
      <div
        className={classNames(
          "transition-all duration-300",
          commonState.isCompactSidebar
            ? "xl:pl-sidebar-compact"
            : "xl:pl-sidebar"
        )}
      >
        <main className="bg-gray-50">{children}</main>
      </div>
    </>
  );
};
