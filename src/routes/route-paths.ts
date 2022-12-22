import { buildRoutePaths } from "./build-route-paths";

const baseRoutePaths = buildRoutePaths({
  root: {
    path: "",
    title: "Trang chủ",
  },
  rest: {
    path: "*",
    title: "Không tìm thấy",
  },
} as const);

const appRoutePaths = buildRoutePaths({
  login: { path: "login", title: "Đăng nhập" },
  member: { path: "member", title: "Trang thành viên" },
  property: { path: "property", title: "Trang tài sản" },
  config: {
    path: "config",
    title: "Trang cấu hình",
    children: {
      tab: { path: ":tab" },
      changePassword: { path: "change-password", title: "Mật khẩu" },
      department: { path: "department", title: "Phòng ban" },
      organization: { path: "organization", title: "Tổ chức" },
      personalInfo: { path: "personal-info", title: "Thông tin cá nhân" },
      rolePermission: { path: "role-permission", title: "Phân quyền" },
    },
  },
  event: { path: "event", title: "Trang sự kiện" },
  todo: {
    path: "todo",
    title: "Trang công việc",
    children: {
      kanban: { path: "kanban", title: "Kanban" },
      table: { path: "table", title: "Bảng" },
      tab: { path: ":tab", children: { test: { path: "Test", title: "asd" } } },
    },
  },
} as const);

export const routePaths = { ...baseRoutePaths, ...appRoutePaths };
