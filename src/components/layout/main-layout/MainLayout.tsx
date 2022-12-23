import classNames from "classnames";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useTourLayout } from "@/components/tour";
import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { PageKey } from "@/routes";
import { LocalStorageService } from "@/utils/funcs/local-storage-service";
import { AppReact } from "@/utils/types";

import { Header } from "../header";
import { SidebarDesktop } from "../sidebar";

type TProps = {
  pageKey: PageKey;
};

export const MainLayout: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  pageKey,
}) => {
  const [isCompactSidebar, setIsCompactSidebar] = useState(
    () =>
      LocalStorageService.getValue<boolean>(
        APP_LOCAL_STORAGE_KEYS.IS_COMPACT_SIDEBAR
      ) ?? false
  );

  const onToggleCompactSidebar = () => {
    setIsCompactSidebar((prev) => {
      LocalStorageService.setValue<boolean>(
        APP_LOCAL_STORAGE_KEYS.IS_COMPACT_SIDEBAR,
        !prev
      );
      return !prev;
    });
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 280);
  };

  useTourLayout();
  useHotkeys("b,command+b,ctrl+b", () => {
    onToggleCompactSidebar();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isCompactSidebar={isCompactSidebar} pageKey={pageKey} />

      <SidebarDesktop
        pageKey={pageKey}
        isCompactSidebar={isCompactSidebar}
        onToggleCompactSidebar={onToggleCompactSidebar}
      />

      <div
        className={classNames(
          "transition-all duration-300",
          isCompactSidebar ? "xl:pl-sidebar-compact" : "xl:pl-sidebar"
        )}
      >
        <main>{children}</main>
      </div>
    </div>
  );
};
