import { Icon } from "@/assets/icons";
import { EPageKey } from "@/routes";

import { ITabSidebar } from "./type";

export const getTabsSidebar = (): ITabSidebar[] => [
  {
    icon: Icon.List,
    title: "Công việc",
    to: "/todo",
    pageActive: EPageKey.Todo,
  },
  {
    icon: Icon.Users,
    title: "Thành viên",
    to: "/member",
    pageActive: EPageKey.Member,
  },
  {
    icon: Icon.Money,
    title: "Tài sản",
    to: "/property",
    pageActive: EPageKey.Property,
  },

  {
    icon: Icon.Gear,
    title: "Cấu hình",
    to: "/config",
    pageActive: EPageKey.Config,
  },
];
