import { Icon } from "@/assets/icons";

import { ITabSidebar } from "./type";

export const getTabsSidebar = (): ITabSidebar[] => [
  {
    icon: Icon.List,
    title: "Công việc",
    to: "/todo",
    pageActive: "todo",
  },
  {
    icon: Icon.Users,
    title: "Thành viên",
    to: "/member",
    pageActive: "member",
  },
  {
    icon: Icon.Money,
    title: "Tài sản",
    to: "/property",
    pageActive: "property",
  },

  {
    icon: Icon.Gear,
    title: "Cấu hình",
    to: "/config",
    pageActive: "config",
  },
];
