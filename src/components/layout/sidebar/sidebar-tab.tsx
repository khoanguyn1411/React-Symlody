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
    to: "/asset",
    pageActive: "Asset",
  },
  {
    icon: Icon.Calendar,
    title: "Sự kiện",
    to: "/asset",
    pageActive: "Event",
  },
  {
    icon: Icon.List,
    title: "Công việc",
    to: "/asset",
    pageActive: "Todos",
  },
  {
    icon: Icon.Target,
    title: "Mục tiêu",
    to: "/asset",
    pageActive: "Target",
  },
  {
    icon: Icon.Wrench,
    title: "Cấu hình",
    to: "/config",
    pageActive: "Config",
  },
];
