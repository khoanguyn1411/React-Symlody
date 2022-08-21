import React from "react";
import { useParams } from "react-router-dom";

import { Button, Dropdown, NotFound, TabHost } from "@/components";

import { ActionConfigDepartment, TabConfigDepartment } from "./config-tabs";

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
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
      <TabHost
        tabUrlChange={tab}
        renderTabs={[
          {
            title: "Tổ chức",
            children: (
              <div>
                <Dropdown
                  placement={"bottom-left"}
                  listSetting={[
                    {
                      key: "something",
                      value: "something",
                    },
                    {
                      key: "somg2",
                      value: "asdasd",
                    },
                    {
                      key: "asdas",
                      value: "asdas",
                    },
                  ]}
                  onChange={function (value): void {
                    console.log(value.key);
                  }}
                >
                  Test Dropdown
                </Dropdown>
              </div>
            ),
            rightSide: <Button className="w-20">Lưu</Button>,
            to: "/config",
          },
          {
            title: "Phòng ban",
            children: <TabConfigDepartment />,
            rightSide: <ActionConfigDepartment />,
            to: "/config/department",
          },
        ]}
      />
    </div>
  );
};
