import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, NotificationImg, TabHost } from "@/components";
import { PageKey, routePaths } from "@/routes";

import {
  ActionConfigDepartment,
  TabChangePassword,
  TabConfigDepartment,
  TabOrganization,
  TabPersonalInfo,
} from "./config-tabs";
import { TabRolePermission } from "./config-tabs/role-permission";

type ContentTab = {
  content: ReactNode;
  rightSide?: ReactNode;
};

const initializeTabContents = (key: PageKey): ContentTab => {
  switch (key) {
    case "config.organization":
      return {
        content: <TabOrganization />,
      };
    case "config.personalInfo":
      return {
        content: <TabPersonalInfo />,
      };
    case "config.changePassword":
      return {
        content: <TabChangePassword />,
      };
    case "config.department":
      return {
        content: <TabConfigDepartment />,
        rightSide: <ActionConfigDepartment />,
      };
    case "config.rolePermission":
      return {
        content: <TabRolePermission />,
      };
    default:
      return {
        content: <TabOrganization />,
      };
  }
};

const MAP_PATH_TO_PAGE_KEY: Record<string, PageKey> = {
  [routePaths.config.children.department.path]: "config.department",
  [routePaths.config.children.organization.path]: "config.organization",
  [routePaths.config.children.rolePermission.path]: "config.rolePermission",
  [routePaths.config.children.changePassword.path]: "config.changePassword",
  [routePaths.config.children.personalInfo.path]: "config.personalInfo",
};

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentTab>(
    initializeTabContents(MAP_PATH_TO_PAGE_KEY[tab])
  );

  const tabUrls = routePaths.config.children;

  const isInvalidUrl = MAP_PATH_TO_PAGE_KEY[tab] == null && tab != null;

  useEffect(() => {
    setContent(initializeTabContents(MAP_PATH_TO_PAGE_KEY[tab]));
  }, [navigate, tab]);

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
        <Container.HeaderRight>{content.rightSide}</Container.HeaderRight>
      </Container.HeaderForTabHost>
      <Container.Body>{content.content}</Container.Body>
    </>
  );
};
