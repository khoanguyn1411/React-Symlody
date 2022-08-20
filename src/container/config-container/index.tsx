import React from "react";

import { Button, TabHost } from "@/components";

export const ConfigContainer = () => {
  return (
    <div>
      <TabHost
        renderTabs={[
          {
            title: "Tổ chức",
            children: <div>Content 1</div>,
            rightSide: <Button className="w-20">Lưu</Button>,
          },
          {
            title: "Phòng ban",
            children: <div>Content 2</div>,
            rightSide: (
              <Button prefix={<i className="mr-2 fas fa-plus-circle" />}>
                Tạo mới
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
};
