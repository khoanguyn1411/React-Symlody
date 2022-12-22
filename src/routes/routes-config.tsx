import { NotificationImg } from "@/components/notification-image";
import {
  ConfigContainer,
  LoginContainer,
  MemberContainer,
  PropertyContainer,
  TodoContainer,
} from "@/container";

import { ExtractPageKey } from "./build-route-paths";
import { routePaths } from "./route-paths";

export interface IRoutes {
  path: string;
  component: React.ReactNode;
  pageKey: PageKey;
  pageTitle?: string;
  layout?: React.ReactNode;
}

export type PageKey = ExtractPageKey<typeof routePaths>;

export const APP_DEFAULT_PAGE = routePaths.config.url;

const privateRoutes: IRoutes[] = [
  // {
  //   path: "/",
  //   component: <HomeContainer />,
  //   pageKey: PageKey.Home,
  //   pageTitle: "Trang chủ",
  // },
  {
    path: routePaths.todo.url,
    component: <TodoContainer />,
    pageKey: "todo",
    pageTitle: routePaths.todo.title,
  },
  {
    path: routePaths.todo.children.tab.url,
    component: <TodoContainer />,
    pageKey: "todo",
  },
  {
    path: routePaths.member.url,
    component: <MemberContainer />,
    pageKey: "member",
    pageTitle: routePaths.member.title,
  },
  {
    path: routePaths.property.url,
    component: <PropertyContainer />,
    pageKey: "property",
    pageTitle: routePaths.property.title,
  },
  {
    path: routePaths.config.url,
    component: <ConfigContainer />,
    pageKey: "config",
    pageTitle: routePaths.config.title,
  },
  {
    path: routePaths.config.children.tab.url,
    component: <ConfigContainer />,
    pageKey: "config",
  },

  // {
  //   path: "/event",
  //   component: <EventContainer />,
  //   pageKey: PageKey.Event,
  //   pageTitle: "Trang sự kiện",
  // },
  // {
  //   path: "/target",
  //   component: <TargetContainer />,
  //   pageKey: PageKey.Target,
  //   pageTitle: "Trang mục tiêu",
  // },
  {
    path: routePaths.rest.url,
    component: (
      <NotificationImg
        title="Trang bạn đang truy cập không tồn tại"
        description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
      />
    ),
    pageKey: "rest",
    pageTitle: routePaths.rest.title,
  },
];

const publicRoutes: IRoutes[] = [
  {
    path: routePaths.login.url,
    component: <LoginContainer />,
    pageKey: "login",
    pageTitle: routePaths.login.title,
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
