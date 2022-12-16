import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { PropertyForm } from "./type";

export const schema = yup.object().shape<YupValidation<PropertyForm>>({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  propOwner: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  inChargerId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  price: yup.string().notRequired(),
  note: yup.string().notRequired(),
  image: yup.mixed().notRequired().nullable(),
  imageLink: yup.string().notRequired(),
  quantity: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .test("no-leading-zero", APP_ERROR_MESSAGE.MIN_NUMBER(0), (value) => {
      return value && Number(value) !== 0;
    })
    .test("no-overload-32767", APP_ERROR_MESSAGE.MAX_NUMBER(32767), (value) => {
      return value && Number(value) <= 32767;
    }),
});
