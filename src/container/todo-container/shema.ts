import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormTodoInfo } from "./type";

export const schema: yup.SchemaOf<IFormTodoInfo> = yup.object().shape({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  priority: yup.string().notRequired(),
  assignee: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  expiredDate: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  reporter: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  description: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
});
