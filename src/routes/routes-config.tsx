import { NotFound } from "@/components";
import {
  ConfigContainer,
  EventContainer,
  HomeContainer,
  LoginContainer,
  MemberContainer,
  PropertyContainer,
  TargetContainer,
  TodosContainer,
} from "@/container";

export type Page_Key =
  | "Home"
  | "Member"
  | "Property"
  | "Config"
  | "Event"
  | "Todos"
  | "Target";
interface IRoutes {
  path: string;
  component: React.ReactNode | JSX.Element;
  pageKey: Page_Key;
  pageTitle: string;
  // layout?: React.FC;
}

const privateRoutes: readonly IRoutes[] = [
  {
    path: "/",
    component: <HomeContainer />,
    pageKey: "Home",
    pageTitle: "Trang chủ",
  },
  {
    path: "/member",
    component: <MemberContainer />,
    pageKey: "Member",
    pageTitle: "Trang thành viên",
  },
  {
    path: "/property",
    component: <PropertyContainer />,
    pageKey: "Property",
    pageTitle: "Trang tài sản",
  },
  {
    path: "/config",
    component: <ConfigContainer />,
    pageKey: "Config",
    pageTitle: "Trang cấu hình",
  },
  {
    path: "/event",
    component: <EventContainer />,
    pageKey: "Event",
    pageTitle: "Trang sự kiện",
  },
  {
    path: "/todos",
    component: <TodosContainer />,
    pageKey: "Todos",
    pageTitle: "Trang công việc",
  },
  {
    path: "/target",
    component: <TargetContainer />,
    pageKey: "Target",
    pageTitle: "Trang mục tiêu",
  },

  {
    path: "/*",
    component: (
      <NotFound
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
