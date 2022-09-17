import { Icon } from "@/assets/icons";

import { ITabSidebar } from "./type";

export const getTabsSidebar = (): ITabSidebar[] => [
  {
    icon: Icon.Home,
    title: "Trang chủ",
    to: "/",
    pageActive: "Home",
  },
  {
    icon: Icon.Users,
    title: "Thành viên",
    to: "/member",
    pageActive: "Member",
  },
  {
    icon: Icon.Money,
    title: "Tài sản",
    to: "/property",
    pageActive: "Property",
  },
  {
    icon: Icon.Calendar,
    title: "Sự kiện",
    to: "/event",
    pageActive: "Event",
  },
  {
    icon: Icon.List,
    title: "Công việc",
    to: "/todos",
    pageActive: "Todos",
  },
  {
    icon: Icon.Target,
    title: "Mục tiêu",
    to: "/target",
    pageActive: "Target",
  },
  {
    icon: Icon.Gear,
    title: "Cấu hình",
    to: "/config",
    pageActive: "Config",
  },
];
