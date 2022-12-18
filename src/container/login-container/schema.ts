import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { Login } from "@/features/types";
import { YupValidation } from "@/utils/types";

export const schema = yup.object().shape<YupValidation<Login>>({
  email: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  // .email(APP_ERROR_MESSAGE.EMAIL),
  password: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
