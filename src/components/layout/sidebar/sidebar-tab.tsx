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
    icon: Icon.Home,
    title: "Tài sản",
    to: "/asset",
    pageActive: "Asset",
  },
  {
    icon: Icon.Home,
    title: "Cấu hình",
    to: "/config",
    pageActive: "Config",
  },
];
