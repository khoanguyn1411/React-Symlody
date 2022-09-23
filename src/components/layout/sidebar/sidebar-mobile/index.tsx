import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { Drawer } from "@/components/elements";
import { APP_NAME } from "@/constants";

import { SidebarItem } from "../sidebar-item";
import { getTabsSidebar } from "../sidebar-tab";

type TProps = {
  pageKey: string;
  visible: boolean;
  onClose: () => void;
};

export const SidebarMobile: React.FC<TProps> = ({
  pageKey,
  visible = false,
  onClose,
}) => {
  const navigate = useNavigate();
  const tabsSidebar = getTabsSidebar();
  const handleSwitchTab = (path: string) => () => {
    navigate(path);
  };

  return (
    <Drawer
      placement="left"
      shouldResponsive={false}
      width={256}
      visible={visible}
      onClose={onClose}
    >
      <>
        <div
          className={classNames(
            "flex items-center justify-center w-full mt-4 mb-3 space-x-4"
          )}
        >
          <img src={images.Logo} alt="logo" width={40} height={40} />
          <h1
            className={classNames(
              "transition-width overflow-hidden text-xl font-medium duration-200"
            )}
          >
            {APP_NAME}
          </h1>
        </div>

        {tabsSidebar.map((tab) => (
          <SidebarItem
            key={tab.pageActive}
            tab={tab}
            isActive={pageKey === tab.pageActive}
            onClick={handleSwitchTab(tab.to)}
          />
        ))}
      </>
    </Drawer>
  );
};
