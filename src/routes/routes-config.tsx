import { HomeContainer, LoginContainer } from "@/container";

interface IRoutes {
  path: string;
  component: React.FC;
}

const privateRoutes: IRoutes[] = [
  {
    path: "/",
    component: HomeContainer,
  },
];

const publicRoutes: IRoutes[] = [
  {
    path: "/login",
    component: LoginContainer,
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
