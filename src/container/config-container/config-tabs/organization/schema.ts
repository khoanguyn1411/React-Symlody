import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";

import { IFormOrganizationConfig } from "./type";

export const schema: yup.SchemaOf<IFormOrganizationConfig> = yup
  .object()
  .shape({
    name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
    abbreviation_name: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
    email: yup.string().email(APP_ERROR_MESSAGE.EMAIL),

    phone: yup.string(),
    schoolBelonged: yup.string(),
    address: yup.string(),
    // description: yup.string().notRequired(),
  });
