import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { YupValidation } from "@/utils/types";

import { DepartmentForm } from "./types";

export const schema = yup.object().shape<YupValidation<DepartmentForm>>({
  id: yup.number(),
  name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  abbreviationName: yup.string(),
});
