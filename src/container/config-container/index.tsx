import React, { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, NotFound, TabHost, TTab } from "@/components";

import { ActionConfigDepartment, TabConfigDepartment } from "./config-tabs";

type ContentTab = {
  content: ReactNode;
  rightSide: ReactNode;
};

const getContentTab = (key: TTab["key"]): ContentTab => {
  if (key === undefined) {
    return {
      content: <div>Demo</div>,
      rightSide: <Button className="w-20">Lưu</Button>,
    };
  }
  return {
    content: <TabConfigDepartment />,
    rightSide: <ActionConfigDepartment />,
  };
};

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const [content, setContent] = useState<ContentTab>(getContentTab(tab));
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
          listTabs={[
            { key: undefined, title: "Tổ chức", to: "/config" },
            { key: "department", title: "Phòng ban", to: "/config/department" },
          ]}
          onUrlChange={handleChangeTab}
          paramChangeDependency={tab}
          defaultActive={tab}
        />
        <div>{content.rightSide}</div>
      </div>
      <div className="p-default">{content.content}</div>
    </div>
  );
};
