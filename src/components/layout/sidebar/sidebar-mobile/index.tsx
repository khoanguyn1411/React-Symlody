import { useState } from "react";

import { Drawer } from "@/components/elements";

import { SidebarItem } from "../sidebar-item";
import { getTabsSidebar } from "../sidebar-tab";

type TProps = {
  pageKey: string;
};

export const SidebarMobile: React.FC<TProps> = ({ pageKey }) => {
  const tabsSidebar = getTabsSidebar();

  const [isOpenSidebard, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((v) => !v);
  };

  return (
    <>
      <div className="flex-1 block xl:hidden">
        <span
          aria-hidden="true"
          onClick={toggleSidebar}
          className="cursor-pointer"
        >
          <i className="fas fa-bars" />
        </span>
      </div>
    </>
  );
};
