import { useParams } from "react-router-dom";

import { ConfigTabs } from "./config-lazy-tabs";
import { MAP_PATH_TO_PAGE_KEY } from "./mapper";

export const ConfigTabContents: React.FC = () => {
  const { tab } = useParams();
  const tabKey = MAP_PATH_TO_PAGE_KEY[tab];
  switch (tabKey) {
    case "config.organization":
      return <ConfigTabs.TabOrganization />;
    case "config.personalInfo":
      return <ConfigTabs.TabPersonalInfo />;
    case "config.changePassword":
      return <ConfigTabs.TabChangePassword />;
    case "config.department":
      return <ConfigTabs.TabConfigDepartment />;
    case "config.rolePermission":
      return <ConfigTabs.TabRolePermission />;
    default:
      return <ConfigTabs.TabOrganization />;
  }
};
