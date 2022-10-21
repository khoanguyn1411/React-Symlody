import React, { ReactNode, useEffect, useState } from "react";

import { Container, TabHost, TTab } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { setActiveTab } from "@/features/reducers";

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

export const ConfigContainer: React.FC = () => {
  const commonStore = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<ContentTab>(
    getContentTab(commonStore.activeTab.config)
  );
  const handleChangeTab = (tab: TTab) => {
    dispatch(setActiveTab({ config: tab.key as EConfigTabKey }));
  };

  useEffect(() => {
    setContent(getContentTab(commonStore.activeTab.config));
  }, [commonStore.activeTab.config]);

  return (
    <>
      <Container.HeaderForTabHost>
        <TabHost
          defaultActive={commonStore.activeTab.config}
          tabChangeDependOnChangeOf={commonStore.activeTab.config}
          isHeaderTabHost
          listTabs={[
            {
              key: EConfigTabKey.Organization,
              title: EConfigTabReadableString.Organization,
            },
            {
              key: EConfigTabKey.Department,
              title: EConfigTabReadableString.Department,
            },
            {
              key: EConfigTabKey.RolePermission,
              title: EConfigTabReadableString.RolePermission,
            },
            {
              key: EConfigTabKey.PersonalInfo,
              title: EConfigTabReadableString.PersonalInfo,
            },
            {
              key: EConfigTabKey.ChangePassword,
              title: EConfigTabReadableString.ChangePassword,
            },
          ]}
          onChangeTab={handleChangeTab}
        />
        <Container.HeaderRight>{content.rightSide}</Container.HeaderRight>
      </Container.HeaderForTabHost>
      <Container.Body>{content.content}</Container.Body>
    </>
  );
};
