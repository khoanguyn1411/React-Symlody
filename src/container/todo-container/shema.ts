import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormTodoInfo } from "./type";

export const schema: yup.SchemaOf<IFormTodoInfo> = yup.object().shape({
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  priority: yup.string().notRequired(),
  assignee: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  expiredDate: yup.string().notRequired().nullable(),
  reporter: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  description: yup.string().notRequired(),
});
