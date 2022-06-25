import { HomeContainer, LoginContainer, MemberContainer } from "@/container";

interface IRoutes {
  path: string;
  component: React.FC;
  layout?: React.FC;
}

const privateRoutes: IRoutes[] = [
  {
    path: "/",
    component: HomeContainer,
  },
  {
    path: "/member",
    component: MemberContainer,
  },
];

const publicRoutes: IRoutes[] = [
  {
    path: "/login",
    component: LoginContainer,
    layout: null,
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
