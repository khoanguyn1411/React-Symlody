import { HomeContainer, LoginContainer, MemberContainer } from "@/container";

export type Page_Key = "Home" | "Member";
interface IRoutes {
  path: string;
  component: React.FC;
  pageKey: Page_Key;
  pageTitle: string;
  // layout?: React.FC;
}

const privateRoutes: IRoutes[] = [
  {
    path: "/",
    component: HomeContainer,
    pageKey: "Home",
    pageTitle: "Trang chủ",
  },
  {
    path: "/member",
    component: MemberContainer,
    pageKey: "Member",
    pageTitle: "Trang thành viên",
  },
];

const publicRoutes: IRoutes[] = [
  {
    path: "/login",
    component: LoginContainer,
    // layout: null,
    pageKey: null,
    pageTitle: null,
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
