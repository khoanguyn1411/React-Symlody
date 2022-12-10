import {
  ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME,
  ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL,
  Roles,
  RolesManagerSortName,
  UserPermissionConfigCreation,
  UserShort,
} from "@/features/types";

import { EPermissionOptions } from "./constants";
import { RolePermissionForm } from "./types";

const getModelGroup = ({ type, roleManager }: RolePermissionForm): Roles[] => {
  if (type === EPermissionOptions.Lead) {
    return [Roles.Lead];
  }
  if (type === EPermissionOptions.Manager) {
    return roleManager.map(
      (role) => ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL[role]
    );
  }
  if (type === EPermissionOptions.Member) {
    return [];
  }
};

const getFormType = (model: UserShort): EPermissionOptions => {
  if (model.isRole([Roles.Lead])) {
    return EPermissionOptions.Lead;
  }
  if (model.isRole("manager")) {
    return EPermissionOptions.Manager;
  }
  if (model.isRole("member")) {
    return EPermissionOptions.Member;
  }
};

export class RolePermissionFormMapper {
  public static fromModel(model: UserShort): RolePermissionForm {
    return {
      userId: model.id,
      type: getFormType(model),
      roleManager: model.groups.reduce((acc: RolesManagerSortName[], cur) => {
        const sortNameManager = ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME[cur.name];
        if (sortNameManager) {
          return [...acc, sortNameManager];
        }
        return acc;
      }, []),
    };
  }

  public static toModel(
    formData: RolePermissionForm
  ): UserPermissionConfigCreation {
    return {
      userId: formData.userId,
      groups: getModelGroup(formData),
    };
  }
}
