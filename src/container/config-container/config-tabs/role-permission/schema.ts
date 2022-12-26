import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { EPermissionOptions } from "./constants";
import { RolePermissionForm } from "./types";

export const schema = yup.object().shape<YupValidation<RolePermissionForm>>({
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  roleManager: yup
    .array()
    .of(yup.string())
    .test(
      "is-empty-role-manager",
      APP_ERROR_MESSAGE.REQUIRED,
      function (value) {
        if (value == null) {
          return true;
        }
        if (this.parent.type === EPermissionOptions.Manager) {
          return value.length > 0;
        }
        return true;
      }
    ),
});
