import { Icon } from "@/assets/icons";
import { TIconProps } from "@/assets/icons/type";
import { EPageKey, RouteMapper } from "@/routes";
import { FormatService } from "@/utils";

import { ITabSidebar } from "./type";

type TSidebar = {
  pageActive: EPageKey;
  icon: React.FC<TIconProps>;
};

const AVAILABLE_PAGES: TSidebar[] = [
  {
    pageActive: EPageKey.Todo,
    icon: Icon.List,
  },
  {
    pageActive: EPageKey.Member,
    icon: Icon.Users,
  },
  {
    pageActive: EPageKey.Property,
    icon: Icon.Money,
  },
  {
    pageActive: EPageKey.Config,
    icon: Icon.Gear,
  },
];

export const getTabsSidebar = (): ITabSidebar[] =>
  AVAILABLE_PAGES.map((item) => {
    const title = RouteMapper.toTitle(item.pageActive).replace("Trang", "");
    return {
      icon: item.icon,
      title: FormatService.capitalizeFirstLetter(1, title),
      to: RouteMapper.toPath(item.pageActive),
      pageActive: item.pageActive,
    };
  });
