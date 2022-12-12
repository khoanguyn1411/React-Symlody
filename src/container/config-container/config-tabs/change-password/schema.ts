import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { ChangePasswordForm } from "./type";

export const schema = yup.object().shape<YupValidation<ChangePasswordForm>>({
  oldPassword: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  newPassword: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Trường mật khẩu phải có ít nhất 8 ký tự và 1 từ viết hoa"
    ),
  confirmPassword: yup
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
