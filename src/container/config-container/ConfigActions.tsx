import { useParams } from "react-router-dom";

import { ActionConfigDepartment } from "./config-tabs";
import { ActionConfigRolePermission } from "./config-tabs/role-permission/role-permission-components/ActionConfigRolePermission";
import { MAP_PATH_TO_PAGE_KEY } from "./mapper";

export const ConfigActions: React.FC = () => {
  const { tab } = useParams();
  const tabKey = MAP_PATH_TO_PAGE_KEY[tab];
  switch (tabKey) {
    case "config.department":
      return <ActionConfigDepartment />;
    case "config.rolePermission":
      return <ActionConfigRolePermission />;
    default:
      return;
  }
};
