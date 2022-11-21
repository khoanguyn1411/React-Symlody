import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormChangePassword } from "./type";

export const schema: yup.SchemaOf<IFormChangePassword> = yup.object().shape({
  old_password: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  new_password: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Trường mật khẩu phải có ít nhất 8 ký tự và 1 từ viết hoa"
    ),
  confirm_password: yup
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
