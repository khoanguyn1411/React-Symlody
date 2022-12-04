import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormDepartment } from "./types";

export const schema: yup.SchemaOf<IFormDepartment> = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  abbreviationName: yup.string(),
});
