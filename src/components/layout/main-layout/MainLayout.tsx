import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";

import { useTourLayout } from "@/components/tour";
import { useAppDispatch, useAppSelector } from "@/features";
import { toggleCompactSidebar } from "@/features/reducers";
import { PageKey } from "@/routes";
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
  const dispatch = useAppDispatch();
  const commonState = useAppSelector((state) => state.common);

  useHotkeys("b,command+b,ctrl+b", () => {
    dispatch(toggleCompactSidebar());
  });

  useTourLayout();

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
