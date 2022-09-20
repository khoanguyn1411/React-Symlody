import classNames from "classnames";
import { memo } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useAppDispatch, useAppSelector } from "@/features";
import { toggleCompactSidebar } from "@/features/reducers";
import { Page_Key } from "@/routes";
import { GlobalTypes } from "@/types";

import { Header } from "../header";
import { SidebarDesktop } from "../sidebar";

type TProps = {
  pageKey: Page_Key;
};

const _MainLayout: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  pageKey,
}) => {
  const dispatch = useAppDispatch();
  const commonState = useAppSelector((state) => state.common);

  useHotkeys("b,command+b,ctrl+b", () => {
    dispatch(toggleCompactSidebar());
  });

  const onToggleCompactSidebar = () => {
    dispatch(toggleCompactSidebar());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isCompactSidebar={commonState.isCompactSidebar}
        pageKey={pageKey}
      />

      <SidebarDesktop
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
        <main>{children}</main>
      </div>
    </div>
  );
};

export const MainLayout = memo(_MainLayout);
