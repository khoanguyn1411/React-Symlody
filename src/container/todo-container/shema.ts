import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormTodoInfo } from "./type";

export const schema: yup.SchemaOf<IFormTodoInfo> = yup.object().shape({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  priority: yup.string().notRequired(),
  assignee: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  expiredDate: yup.string().notRequired(),
  reporter: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  description: yup.string().notRequired(),
});
