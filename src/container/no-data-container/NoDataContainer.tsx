import React from "react";

import { NotificationImg } from "@/components";

export const NoDataContainer: React.FC = () => {
  return (
    <NotificationImg
      title="Trang bạn đang truy cập không tồn tại"
      description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
    />
  );
};
