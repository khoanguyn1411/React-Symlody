import { PageKey, routePaths } from "@/routes";

export const MAP_PATH_TO_PAGE_KEY: Record<string, PageKey> = {
  [routePaths.config.children.department.path]: "config.department",
  [routePaths.config.children.organization.path]: "config.organization",
  [routePaths.config.children.rolePermission.path]: "config.rolePermission",
  [routePaths.config.children.changePassword.path]: "config.changePassword",
  [routePaths.config.children.personalInfo.path]: "config.personalInfo",
};
