import { RouteObject, useRoutes } from "react-router-dom";

import { MainLayout } from "@/components";
import { AuthorizedGuard, UnauthorizedGuard } from "@/guards";
import { useAuth } from "@/hooks";

import { routesConfigs } from "./routes-config";

export const RootRoutes: React.FC = () => {
  const { isAuth } = useAuth();
  const routes: RouteObject[] = [
    {
      element: <AuthorizedGuard isAuth={isAuth} />,
      children: routesConfigs.privateRoutes.map((item) => ({
        path: item.path,
        element: (
          <MainLayout pageKey={item.pageKey}>{item.component}</MainLayout>
        ),
      })),
    },
    {
      element: <UnauthorizedGuard isAuth={isAuth} />,
      children: routesConfigs.publicRoutes.map((item) => ({
        path: item.path,
        element: item.component,
      })),
    },
  ];

  return useRoutes(routes);
};
