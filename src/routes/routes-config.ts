import { IRoutes, RouteMapper } from ".";
import { PRIVATE_ROUTE_KEYS, PUBLIC_ROUTE_KEYS } from "./constants";

const privateRoutes: readonly IRoutes[] = PRIVATE_ROUTE_KEYS.map((key) => {
  return {
    pageKey: key,
    pageTitle: RouteMapper.toTitle(key),
    path: RouteMapper.toPath(key),
    component: RouteMapper.toComponent(key),
  };
});

const publicRoutes: readonly IRoutes[] = PUBLIC_ROUTE_KEYS.map((key) => {
  return {
    pageKey: key,
    pageTitle: RouteMapper.toTitle(key),
    path: RouteMapper.toPath(key),
    component: RouteMapper.toComponent(key),
  };
});

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
