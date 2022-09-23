import React, { ReactNode, useState } from "react";

import { Button, TabHost, TTab } from "@/components";

import { ActionConfigDepartment, TabConfigDepartment } from "./config-tabs";
import { TabOrganization } from "./config-tabs/config-organization";

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
    <div>
      <div className="flex justify-between w-full py-3 bg-white border-b px-default">
        <TabHost
          listTabs={[
            { key: "organization", title: "Tổ chức" },
            { key: "department", title: "Phòng ban" },
          ]}
          onChangeTab={handleChangeTab}
        />
        <div>{content.rightSide}</div>
      </div>
      <div className="p-default">{content.content}</div>
    </div>
  );
};
