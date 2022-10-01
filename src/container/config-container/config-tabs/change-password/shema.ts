import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormChangePassword } from "./type";

export const schema: yup.SchemaOf<IFormChangePassword> = yup.object().shape({
  currentPassword: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  newPassword: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  confirmNewPassword: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .test(
      "is-match-password",
      APP_ERROR_MESSAGE.PASSWORD_NOT_MATCH,
      function (value) {
        return value === this.parent.newPassword;
      }
    ),
});