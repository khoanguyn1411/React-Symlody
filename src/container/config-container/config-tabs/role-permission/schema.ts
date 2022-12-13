import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { RolePermissionForm } from "./types";

export const schema = yup.object().shape<YupValidation<RolePermissionForm>>({
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  roleManager: yup.array().of(yup.string()),
});
