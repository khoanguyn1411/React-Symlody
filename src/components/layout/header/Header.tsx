import classNames from "classnames";
import React, { useState } from "react";

// import { Icon } from "@/assets/icons";
import { images } from "@/assets/images";
import { useAppSelector } from "@/features";

import { Avatar } from "../../elements";
import { Media } from "../../media";
import { SidebarMobile } from "../sidebar";
import { UserDropdown } from "./UserDropdown";

type TProps = {
  className?: string;
  isCompactSidebar: boolean;
  pageKey: string;
};

export const Header: React.FC<TProps> = ({ isCompactSidebar, pageKey }) => {
  const userStore = useAppSelector((state) => state.user);

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((v) => !v);
  };

  return (
    <header
      className={classNames(
        "flex items-center bg-white z-10 justify-between xl:justify-end px-4 h-header sticky top-0 mx-0 transition-margin  duration-300  border-b border-gray-200",
        isCompactSidebar ? "xl:ml-sidebar-compact " : "xl:ml-sidebar"
      )}
    >
      <Media lessThan="xl">
        <div className="flex-1">
          <span
            aria-hidden="true"
            onClick={toggleSidebar}
            className="cursor-pointer"
          >
            <i className="fas fa-bars" />
          </span>
        </div>
        <SidebarMobile
          pageKey={pageKey}
          visible={isOpenSidebar}
          onClose={() => setIsOpenSidebar(false)}
        />
      </Media>

      <div className="flex items-center space-x-4">
        {/* <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-inner cursor-pointer hover:bg-gray-300 transition-all duration-300">
          <i className="text-sm fas fa-question" />
        </span>

        <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-inner cursor-pointer transition-all duration-300 hover:bg-gray-300">
          <Icon.Bell size="small" customColor="text" />
        </span> */}

        <div
          data-tour-id="layout__userDropdown"
          className={classNames(
            "flex items-center bg-white border shadow-sm rounded-md ",
            "py-1 pl-3 pr-2 space-x-4"
          )}
        >
          <div className="flex items-center space-x-2">
            <Avatar src={images.Logo} fullName="Logo" />
            <span className="font-medium"></span>
          </div>
          <UserDropdown user={userStore.user} />
        </div>
      </div>
    </header>
  );
};
