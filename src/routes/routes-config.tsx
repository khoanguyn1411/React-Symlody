import { NotificationImg } from "@/components";
import {
  ConfigContainer,
  EventContainer,
  HomeContainer,
  LoginContainer,
  MemberContainer,
  PropertyContainer,
  TargetContainer,
  TodoContainer,
} from "@/container";

import { APP_ROUTE_PATHS } from "./constants";
import { IRoutes } from "./types";

const privateRoutes: readonly IRoutes[] = [
  {
    path: APP_ROUTE_PATHS.Home,
    component: <HomeContainer />,
    pageKey: "Home",
    pageTitle: "Trang chủ",
  },
  {
    path: APP_ROUTE_PATHS.Member,
    component: <MemberContainer />,
    pageKey: "Member",
    pageTitle: "Trang thành viên",
  },
  {
    path: APP_ROUTE_PATHS.Property,
    component: <PropertyContainer />,
    pageKey: "Property",
    pageTitle: "Trang tài sản",
  },
  {
    path: APP_ROUTE_PATHS.Config,
    component: <ConfigContainer />,
    pageKey: "Config",
    pageTitle: "Trang cấu hình",
  },
  {
    path: APP_ROUTE_PATHS.Event,
    component: <EventContainer />,
    pageKey: "Event",
    pageTitle: "Trang sự kiện",
  },
  {
    path: APP_ROUTE_PATHS.Todo,
    component: <TodoContainer />,
    pageKey: "Todo",
    pageTitle: "Trang công việc",
  },
  {
    path: APP_ROUTE_PATHS.Target,
    component: <TargetContainer />,
    pageKey: "Target",
    pageTitle: "Trang mục tiêu",
  },

  {
    path: "/*",
    component: (
      <NotificationImg
        title="Trang bạn đang truy cập không tồn tại"
        description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
      />
    ),
    pageKey: null,
    pageTitle: "Không tìm thấy",
  },
];

const publicRoutes: readonly IRoutes[] = [
  {
    path: "/login",
    component: <LoginContainer />,
    // layout: null,
    pageKey: null,
    pageTitle: "Đăng nhập",
  },
];

export const routesConfigs = {
  privateRoutes,
  publicRoutes,
};
