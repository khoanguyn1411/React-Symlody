import { ExtractPageKey } from "./build-route-paths";
import { LazyContainer } from "./lazy-containers";
import { routePaths } from "./route-paths";

export interface IRoutes {
  path: string;
  component: React.ReactNode;
  pageKey: PageKey;
  pageTitle?: string;
  layout?: React.ReactNode;
}

export type PageKey = ExtractPageKey<typeof routePaths>;

export const APP_DEFAULT_PAGE = routePaths.todo.url;

const privateRoutes: IRoutes[] = [
  {
    path: routePaths.todo.url,
    component: <LazyContainer.TodoContainer />,
    pageKey: "todo",
    pageTitle: routePaths.todo.title,
  },
  {
    path: routePaths.todo.children.tab.url,
    component: <LazyContainer.TodoContainer />,
    pageKey: "todo",
  },
  {
    path: routePaths.member.url,
    component: <LazyContainer.MemberContainer />,
    pageKey: "member",
    pageTitle: routePaths.member.title,
  },
  {
    path: routePaths.property.url,
    component: <LazyContainer.PropertyContainer />,
    pageKey: "property",
    pageTitle: routePaths.property.title,
  },
  {
    path: routePaths.config.url,
    component: <LazyContainer.ConfigContainer />,
    pageKey: "config",
    pageTitle: routePaths.config.title,
  },
  {
    path: routePaths.config.children.tab.url,
    component: <LazyContainer.ConfigContainer />,
    pageKey: "config",
  },
  {
    path: routePaths.rest.url,
    component: <LazyContainer.NoDataContainer />,
    pageKey: "rest",
    pageTitle: routePaths.rest.title,
  },
];

const publicRoutes: IRoutes[] = [
  {
    path: routePaths.login.url,
    component: <LazyContainer.LoginContainer />,
    pageKey: "login",
    pageTitle: routePaths.login.title,
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
