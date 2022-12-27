import { lazyImport } from "@/utils/funcs/lazy-import";

const { TabChangePassword } = lazyImport(
  () => import("./config-tabs/change-password/TabChangePassword"),
  "TabChangePassword"
);

const { TabPersonalInfo } = lazyImport(
  () => import("./config-tabs/personal-info/TabPersonalInfo"),
  "TabPersonalInfo"
);

const { TabConfigDepartment } = lazyImport(
  () => import("./config-tabs/department/TabDepartment"),
  "TabConfigDepartment"
);

const { TabOrganization } = lazyImport(
  () => import("./config-tabs/organization/TabOrganization"),
  "TabOrganization"
);

const { TabRolePermission } = lazyImport(
  () => import("./config-tabs/role-permission/TabRolePermission"),
  "TabRolePermission"
);

export const ConfigTabs = {
  TabChangePassword,
  TabPersonalInfo,
  TabRolePermission,
  TabOrganization,
  TabConfigDepartment,
};
