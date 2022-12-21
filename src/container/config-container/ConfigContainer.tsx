import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, NotificationImg, TabHost } from "@/components";
import { routePaths } from "@/routes";
import { enumToArray } from "@/utils/funcs/enum-to-array";

import {
  ActionConfigDepartment,
  TabChangePassword,
  TabConfigDepartment,
  TabOrganization,
  TabPersonalInfo,
} from "./config-tabs";
import { TabRolePermission } from "./config-tabs/role-permission";
import { EConfigTabKey } from "./type";

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
    case EConfigTabKey.RolePermission:
      return {
        content: <TabRolePermission />,
      };
    default:
      return {
        content: <TabOrganization />,
      };
  }
};

export const ConfigContainer: React.FC = () => {
  const { tab } = useParams();
  const _tab = tab as EConfigTabKey;
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentTab>(getContentTab(_tab));

  const tabUrls = routePaths.config.children;

  const isInvalidUrl =
    !enumToArray(EConfigTabKey).includes(_tab) && tab != null;

  useEffect(() => {
    setContent(getContentTab(_tab));
  }, [navigate, _tab]);

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
              key: EConfigTabKey.Organization,
              title: tabUrls.organization.title,
              to: tabUrls.organization.url,
            },
            {
              key: EConfigTabKey.Department,
              title: tabUrls.department.title,
              to: tabUrls.department.url,
            },
            {
              key: EConfigTabKey.RolePermission,
              title: tabUrls.rolePermission.title,
              to: tabUrls.rolePermission.url,
            },
            {
              key: EConfigTabKey.PersonalInfo,
              title: tabUrls.personalInfo.title,
              to: tabUrls.personalInfo.url,
            },
            {
              key: EConfigTabKey.ChangePassword,
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
