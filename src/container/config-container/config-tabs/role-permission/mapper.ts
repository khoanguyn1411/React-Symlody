import {
  IConfigInfo,
  IConfigUserUpdate,
  ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME,
  ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL,
  Roles,
  RolesManagerSortName,
} from "@/features/types";

import { EPermissionOptions } from "./constants";
import { IConfigManagerForm } from "./types";

const getModelGroup = ({ type, roleManager }: IConfigManagerForm): Roles[] => {
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

const getFormType = (model: IConfigInfo): EPermissionOptions => {
  if (model.isRole(Roles.Lead)) {
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
  public static fromModel(model: IConfigInfo): IConfigManagerForm {
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

  public static toModel(formData: IConfigManagerForm): IConfigUserUpdate {
    return {
      user_id: formData.userId,
      groups: getModelGroup(formData),
    };
  }
}
