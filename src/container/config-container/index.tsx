import React, { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";

import { NotFound, TabHost, TTab } from "@/components";
``;
import { TabConfigDepartment } from "./config-tabs";

const getContentTab = (key: TTab["key"]) => {
  if (key === undefined) {
    return <div>Demo</div>;
  }
  return <TabConfigDepartment />;
};

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const [content, setContent] = useState<ReactNode>(getContentTab(tab));
  const handleChangeTab = (tab: TTab) => {
    setContent(getContentTab(tab.key));
  };

  if (tab !== undefined && tab !== "department") {
    return (
      <NotFound
        title="Trang bạn đang truy cập không tồn tại"
        description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between w-full py-3 bg-white border-b px-default">
        <TabHost
          isRounded
          tabDependency={tab}
          listTabs={[
            { key: undefined, title: "Tổ chức", to: "/config" },
            { key: "department", title: "Phòng ban", to: "/config/department" },
          ]}
          onUrlChange={handleChangeTab}
          defaultActive={tab}
        />
      </div>
      <div className="p-default">{content}</div>
    </div>
  );
};
