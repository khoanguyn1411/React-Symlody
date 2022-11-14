import { NotificationImg } from "@/components/notification-image";
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

export type PageKey = EPageKey;

export interface IRoutes {
  path: string;
  component: React.ReactNode | JSX.Element;
  pageKey: PageKey;
  pageTitle: string;
  // layout?: React.FC;
}

export enum EPageKey {
  Login = "Login",
  Home = "Home",
  Member = "Member",
  Property = "Property",
  Config = "Config",
  Event = "Event",
  Target = "Target",
  Todo = "Todo",
  NotFound = "NotFound",
}

export enum EPageTitle {
  Login = "Đăng nhập",
  Home = "Trang chủ",
  Member = "Trang thành viên",
  Property = "Trang tài sản",
  Config = "Trang cấu hình",
  Event = "Trang sự kiện",
  Todo = "Trang công việc",
  Target = "Trang mục tiêu",
  NotFound = "Không tìm thấy",
}

export enum EPagePath {
  Home = "/",
  Login = "/login",
  Member = "/member",
  Property = "/property",
  ConfigWithTab = "/config/:tab",
  Config = "/config",
  Event = "/event",
  Target = "/target",
  Todo = "/todo",
  NotFound = "/*",
}

export const PageComponent = {
  Home: <HomeContainer />,
  Member: <MemberContainer />,
  Property: <PropertyContainer />,
  Config: <ConfigContainer />,
  ConfigWithTab: <ConfigContainer />,
  Event: <EventContainer />,
  Target: <TargetContainer />,
  Todo: <TodoContainer />,
  Login: <LoginContainer />,
  NotFound: (
    <NotificationImg
      title="Trang bạn đang truy cập không tồn tại"
      description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
    />
  ),
} as const;

export const APP_DEFAULT_PAGE = EPagePath.Todo;
const privateRoutes: readonly IRoutes[] = [
  // {
  //   path: "/",
  //   component: <HomeContainer />,
  //   pageKey: EPageKey.Home,
  //   pageTitle: "Trang chủ",
  // },
  {
    path: "/todo",
    component: <TodoContainer />,
    pageKey: EPageKey.Todo,
    pageTitle: "Trang công việc",
  },
  {
    path: "/todo/:tab",
    component: <TodoContainer />,
    pageKey: EPageKey.Todo,
    pageTitle: "Trang công việc",
  },
  {
    path: "/member",
    component: <MemberContainer />,
    pageKey: EPageKey.Member,
    pageTitle: "Trang thành viên",
  },
  {
    path: "/property",
    component: <PropertyContainer />,
    pageKey: EPageKey.Property,
    pageTitle: "Trang tài sản",
  },
  {
    path: "/config",
    component: <ConfigContainer />,
    pageKey: EPageKey.Config,
    pageTitle: "Trang cấu hình",
  },
  {
    path: "/config/:tab",
    component: <ConfigContainer />,
    pageKey: EPageKey.Config,
    pageTitle: "Trang cấu hình",
  },

  // {
  //   path: "/event",
  //   component: <EventContainer />,
  //   pageKey: EPageKey.Event,
  //   pageTitle: "Trang sự kiện",
  // },
  // {
  //   path: "/target",
  //   component: <TargetContainer />,
  //   pageKey: EPageKey.Target,
  //   pageTitle: "Trang mục tiêu",
  // },
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
