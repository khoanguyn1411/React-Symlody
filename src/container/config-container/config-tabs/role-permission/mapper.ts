import {
  ERoles,
  ERolesManagerSortName,
  IConfigInfo,
  IConfigUserUpdate,
  ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME,
  ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL,
} from "@/features/types";

import { EPermissionOptions } from "./constants";
import { IConfigManagerForm } from "./types";

export class RolePermissionFormMapper {
  public static fromModel(model: IConfigInfo): IConfigManagerForm {
    return {
      userId: model.id,
      type: model.isRole(ERoles.Lead)
        ? EPermissionOptions.Lead
        : EPermissionOptions.Manager,
      roleManager: model.groups.reduce((acc: ERolesManagerSortName[], cur) => {
        const sortNameManager = ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME[cur.name];
        if (sortNameManager) {
          return [...acc, sortNameManager];
        }
        return acc;
      }, []),
    };
  }

  public static toModel(model: IConfigManagerForm): IConfigUserUpdate {
    return {
      user_id: model.userId,
      groups:
        model.type === EPermissionOptions.Lead
          ? [ERoles.Lead]
          : model.roleManager.map(
              (role) => ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL[role]
            ),
    };
  }
}
