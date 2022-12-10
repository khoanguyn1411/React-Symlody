import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { TodoForm } from "./type";

export const schema = yup.object().shape<YupValidation<TodoForm>>({
  title: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  isPriority: yup.boolean().required(),
  assignee: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  endDate: yup.string().notRequired().nullable(),
  reporter: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  description: yup.string().notRequired(),
  isSentEmail: yup.boolean().required(),
});
