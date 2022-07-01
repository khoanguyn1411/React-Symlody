import { ITabSidebar } from "./type";

const tabsSidebar: ITabSidebar[] = [
  {
    icon: "fas fa-home",
    title: "Trang chủ",
    to: "/",
    pageActive: "Home",
  },
  {
    icon: "fas fa-users",
    title: "Thành viên",
    to: "/member",
    pageActive: "Member",
  },
];

export const getTabsSidebar = () => {
  return tabsSidebar;
};
