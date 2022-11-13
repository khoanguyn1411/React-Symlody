import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, TabHost } from "@/components";
import { EPagePath } from "@/routes";

import {
  ActionConfigDepartment,
  TabChangePassword,
  TabConfigDepartment,
  TabOrganization,
  TabPersonalInfo,
} from "./config-tabs";
import { TabRolePermission } from "./config-tabs/role-permission";
import { EConfigTabKey, EConfigTabReadableString } from "./type";

type ContentTab = {
  content: ReactNode;
  rightSide?: ReactNode;
};

const getContentTab = (key: EConfigTabKey): ContentTab => {
  switch (key) {
    case EConfigTabKey.Organization:
      return {
        content: <TabOrganization />,
      };
    case EConfigTabKey.PersonalInfo:
      return {
        content: <TabPersonalInfo />,
      };
    case EConfigTabKey.ChangePassword:
      return {
        content: <TabChangePassword />,
      };
    case EConfigTabKey.Department:
      return {
        content: <TabConfigDepartment />,
        rightSide: <ActionConfigDepartment />,
      };
    case EConfigTabKey.RolePermission:
      return {
        content: <TabRolePermission />,
      };
    default:
      return {
        content: <TabOrganization />,
      };
  }
};

const getTabUrl = (url: string): string => {
  const BASE_URL = EPagePath.Config;
  return `${BASE_URL}/${url}`;
};

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentTab>(
    getContentTab(tab as EConfigTabKey)
  );

  useEffect(() => {
    if (tab == null) {
      navigate(getTabUrl(EConfigTabKey.Organization));
    }
    setContent(getContentTab(tab as EConfigTabKey));
  }, [tab]);
  return (
    <>
      <Container.HeaderForTabHost>
        <TabHost
          defaultActive={tab}
          tabChangeDependOnChangeOf={tab}
          isHeaderTabHost
          listTabs={[
            {
              key: EConfigTabKey.Organization,
              title: EConfigTabReadableString.Organization,
              to: getTabUrl(EConfigTabKey.Organization),
            },
            {
              key: EConfigTabKey.Department,
              title: EConfigTabReadableString.Department,
              to: getTabUrl(EConfigTabKey.Department),
            },
            {
              key: EConfigTabKey.RolePermission,
              title: EConfigTabReadableString.RolePermission,
              to: getTabUrl(EConfigTabKey.RolePermission),
            },
            {
              key: EConfigTabKey.PersonalInfo,
              title: EConfigTabReadableString.PersonalInfo,
              to: getTabUrl(EConfigTabKey.PersonalInfo),
            },
            {
              key: EConfigTabKey.ChangePassword,
              title: EConfigTabReadableString.ChangePassword,
              to: getTabUrl(EConfigTabKey.ChangePassword),
            },
          ]}
        />
        <Container.HeaderRight>{content.rightSide}</Container.HeaderRight>
      </Container.HeaderForTabHost>
      <Container.Body>{content.content}</Container.Body>
    </>
  );
};
