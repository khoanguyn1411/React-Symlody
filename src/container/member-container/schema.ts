import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(150, APP_ERROR_MESSAGE.MAX(150, "Tên")),
  lastName: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(150, APP_ERROR_MESSAGE.MAX(150, "Họ")),
  gender: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  birthday: yup.string().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  department: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  // role: yup.array().min(1, "Vị trí được yêu cầu").default([]),
  class: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(8, APP_ERROR_MESSAGE.MAX(8, "Mã lớp")),
  studentId: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(10, APP_ERROR_MESSAGE.MAX(10, "MSSV")),
  phone: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(11, APP_ERROR_MESSAGE.MAX(11, "Số điện thoại")),
  address: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(300, APP_ERROR_MESSAGE.MAX(300, "Địa chỉ")),
  home: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(100, APP_ERROR_MESSAGE.MAX(100, "Quê quán")),
  email: yup
    .string()
    .email("Trường này phải là email")
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(254, APP_ERROR_MESSAGE.MAX(254, "Email")),
});
