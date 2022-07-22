import { NotFound } from "@/components";
import { HomeContainer, LoginContainer, MemberContainer } from "@/container";

export type Page_Key = "Home" | "Member";
interface IRoutes {
  path: string;
  component: React.ReactNode | JSX.Element;
  pageKey: Page_Key;
  pageTitle: string;
  // layout?: React.FC;
}

const privateRoutes: IRoutes[] = [
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

const publicRoutes: IRoutes[] = [
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
