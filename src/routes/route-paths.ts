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

const loginRoutePaths = buildRoutePaths({
  login: { path: "login", title: "Đăng nhập" },
} as const);

const memberRoutePaths = buildRoutePaths({
  member: { path: "member", title: "Trang thành viên" },
} as const);

const propertyRoutePaths = buildRoutePaths({
  property: { path: "property", title: "Trang tài sản" },
} as const);

const configRoutePaths = buildRoutePaths({
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
} as const);

const eventRoutePaths = buildRoutePaths({
  event: { path: "event", title: "Trang sự kiện" },
} as const);

const todoRoutePaths = buildRoutePaths({
  todo: {
    path: "todo",
    title: "Trang công việc",
    children: {
      kanban: { path: "kanban", title: "Kanban" },
      table: { path: "table", title: "Bảng" },
      tab: { path: ":tab" },
    },
  },
} as const);

// Add new module route path here.
const appRoutePaths = {
  ...loginRoutePaths,
  ...memberRoutePaths,
  ...propertyRoutePaths,
  ...eventRoutePaths,
  ...configRoutePaths,
  ...todoRoutePaths,
};

export const routePaths = {
  ...baseRoutePaths,
  ...appRoutePaths,
};
