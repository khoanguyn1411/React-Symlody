import { ITabSidebar } from "./type";

const tabsSidebar: ITabSidebar[] = [
  {
    icon: "fas fa-home",
    title: "Trang chủ",
    to: "/dashboard",
  },
  {
    icon: "fas fa-users",
    title: "Thành viên",
    to: "/member",
  },
];

export const getTabsSidebar = () => {
  return tabsSidebar;
};
