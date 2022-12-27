import classNames from "classnames";

import { Icon } from "@/assets/icons";
import { images } from "@/assets/images";

import { Drawer } from "../../../elements";
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
  const tabsSidebar = getTabsSidebar();
  const { navigate } = useNavigateWithTransition();
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
      <div
        className={classNames(
          "flex flex-col gap-8 pt-8 items-center py-2 overflow-hidden"
        )}
      >
        <div className={classNames("flex space-x-3 items-center w-full")}>
          <img
            src={images.Logo}
            alt="Logo App"
            width={35}
            height={35}
            className="mb-1"
          />
          <span className={classNames("transition-opacity")}>
            <Icon.LogoName size="large" />
          </span>
        </div>
        <div className="flex flex-col flex-1 w-full gap-2">
          {tabsSidebar.map((tab) => (
            <SidebarItem
              key={tab.pageActive}
              tab={tab}
              isActive={pageKey === tab.pageActive}
              onClick={handleSwitchTab(tab.to)}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
};
function useNavigateWithTransition(): { navigate: any } {
  throw new Error("Function not implemented.");
}
