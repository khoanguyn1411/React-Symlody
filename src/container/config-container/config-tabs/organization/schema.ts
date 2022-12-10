import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { OrganizationForm } from "./type";

export const schema = yup.object().shape<YupValidation<OrganizationForm>>({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  abbreviationName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  email: yup.string().email(APP_ERROR_MESSAGE.EMAIL),
  phoneNumber: yup.string(),
  school: yup.string(),
  address: yup.string(),
  logo: yup.mixed(),
});
