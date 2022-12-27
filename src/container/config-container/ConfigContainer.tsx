import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Container, NotificationImg, TabHost } from "@/components";
import { routePaths } from "@/routes";

import { ConfigActions } from "./ConfigActions";
import { ConfigTabContents } from "./ConfigTabContents";
import { MAP_PATH_TO_PAGE_KEY } from "./mapper";

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const tabUrls = routePaths.config.children;
  const isInvalidUrl = MAP_PATH_TO_PAGE_KEY[tab] == null && tab != null;

  if (isInvalidUrl) {
    return (
      <NotificationImg
        title="Trang bạn đang truy cập không tồn tại"
        description="Vui lòng kiểm tra lại đường dẫn hoặc liên hệ trung tâm hỗ trợ"
      />
    );
  }
  return (
    <>
      <Container.HeaderForTabHost>
        <TabHost
          defaultActive={tab}
          tabChangeDependOnChangeOf={tab}
          isHeaderTabHost
          isUrlInteraction
          listTabs={[
            {
              key: tabUrls.organization.path,
              title: tabUrls.organization.title,
              to: tabUrls.organization.url,
            },
            {
              key: tabUrls.department.path,
              title: tabUrls.department.title,
              to: tabUrls.department.url,
            },
            {
              key: tabUrls.rolePermission.path,
              title: tabUrls.rolePermission.title,
              to: tabUrls.rolePermission.url,
            },
            {
              key: tabUrls.personalInfo.path,
              title: tabUrls.personalInfo.title,
              to: tabUrls.personalInfo.url,
            },
            {
              key: tabUrls.changePassword.path,
              title: tabUrls.changePassword.title,
              to: tabUrls.changePassword.url,
            },
          ]}
        />
        <Container.HeaderRight>
          <ConfigActions />
        </Container.HeaderRight>
      </Container.HeaderForTabHost>
      <Container.Body>
        <Suspense fallback={<h1>Đang tải...</h1>}>
          <ConfigTabContents />
        </Suspense>
      </Container.Body>
    </>
  );
};
