import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormLoginValue } from "./type";
export const schema: yup.SchemaOf<IFormLoginValue> = yup.object().shape({
  username: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  password: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
