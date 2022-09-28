import React, { ReactNode, useState } from "react";

import { Container, TabHost, TTab } from "@/components";

import {
  ActionConfigDepartment,
  TabChangePassword,
  TabConfigDepartment,
  TabOrganization,
  TabPersonalInfo,
} from "./config-tabs";
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
    default:
      return {
        content: <TabConfigDepartment />,
      };
  }
};

export const ConfigContainer: React.FC = () => {
  const [content, setContent] = useState<ContentTab>(
    getContentTab(EConfigTabKey.Organization)
  );
  const handleChangeTab = (tab: TTab) => {
    setContent(getContentTab(tab.key as EConfigTabKey));
  };

  return (
    <>
      <Container.Header>
        <TabHost
          isNoPaddingTab
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
      </Container.Header>
      <Container.Body>{content.content}</Container.Body>
    </>
  );
};
