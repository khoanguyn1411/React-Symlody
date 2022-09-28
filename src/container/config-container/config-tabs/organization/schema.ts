import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

export const schema = yup.object().shape({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  shortName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  email: yup
    .string()
    .email(APP_ERROR_MESSAGE.EMAIL)
    .required(APP_ERROR_MESSAGE.REQUIRED),
  phone: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  schoolBelonged: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  address: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
