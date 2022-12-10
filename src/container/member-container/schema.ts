import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { AuthAccountCreation, Gender, MemberCreation } from "@/features/types";
import { generateArrayFromEnum } from "@/utils/services/generate-service";
import { StrictOmit, YupValidation } from "@/utils/types";

type AuthAccountForm = AuthAccountCreation;

export type MemberForm = StrictOmit<
  MemberCreation,
  "department" | "avatar" | "isArchived"
> & {
  department: string;
};

export const schema = yup.object().shape<YupValidation<MemberForm>>({
  authAccount: yup.object().shape<YupValidation<AuthAccountForm>>({
    firstName: yup
      .string()
      .required(APP_ERROR_MESSAGE.REQUIRED)
      .max(150, APP_ERROR_MESSAGE.MAX(150, "Tên")),
    lastName: yup
      .string()
      .required(APP_ERROR_MESSAGE.REQUIRED)
      .max(150, APP_ERROR_MESSAGE.MAX(150, "Họ")),
    email: yup
      .string()
      .email(APP_ERROR_MESSAGE.EMAIL)
      .required(APP_ERROR_MESSAGE.REQUIRED)
      .max(254, APP_ERROR_MESSAGE.MAX(254, "Email")),
  }),
  gender: yup
    .mixed<Gender>()
    .oneOf(generateArrayFromEnum(Gender))
    .required(APP_ERROR_MESSAGE.REQUIRED),
  dob: yup.string().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  department: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  className: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(8, APP_ERROR_MESSAGE.MAX(8, "Mã lớp")),
  studentId: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(10, APP_ERROR_MESSAGE.MAX(10, "MSSV")),
  phoneNumber: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(11, APP_ERROR_MESSAGE.MAX(11, "Số điện thoại")),
  address: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(300, APP_ERROR_MESSAGE.MAX(300, "Địa chỉ")),
  homeTown: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .max(100, APP_ERROR_MESSAGE.MAX(100, "Quê quán")),
});
