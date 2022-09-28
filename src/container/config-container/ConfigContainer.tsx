import React, { ReactNode, useState } from "react";

import { Button, Container, TabHost, TTab } from "@/components";

import { ActionConfigDepartment, TabConfigDepartment } from "./config-tabs";
import { TabOrganization } from "./config-tabs/organization/TabOrganization";

type ContentTab = {
  content: ReactNode;
  rightSide: ReactNode;
};

const getContentTab = (key: TTab["key"]): ContentTab => {
  if (key === "organization") {
    return {
      content: <TabOrganization />,
      rightSide: <Button className="w-20">Lưu</Button>,
    };
  }
  return {
    content: <TabConfigDepartment />,
    rightSide: <ActionConfigDepartment />,
  };
};

export const ConfigContainer: React.FC = () => {
  const [content, setContent] = useState<ContentTab>(
    getContentTab("organization")
  );
  const handleChangeTab = (tab: TTab) => {
    setContent(getContentTab(tab.key));
  };

  return (
    <>
      <Container.Header>
        <TabHost
          listTabs={[
            { key: "organization", title: "Tổ chức" },
            { key: "department", title: "Phòng ban" },
          ]}
          onChangeTab={handleChangeTab}
        />
        <Container.HeaderRight>{content.rightSide}</Container.HeaderRight>
      </Container.Header>
      <Container.Body>{content.content}</Container.Body>
    </>
  );
};
