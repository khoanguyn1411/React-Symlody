import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IConfigManagerForm } from "./types";

export const schema: yup.SchemaOf<IConfigManagerForm> = yup.object().shape({
  userId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED),
  type: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  roleManager: yup
    .array()
    .of(yup.string())
    .test({
      message: APP_ERROR_MESSAGE.REQUIRED,
      test: (arr) => arr.length > 0,
    }),
});
