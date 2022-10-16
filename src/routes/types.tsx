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
