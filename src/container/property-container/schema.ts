import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { FormatService } from "@/utils";
export const schema = yup.object().shape({
  assetName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  inCharge: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  owner: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  quantity: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .min(1, APP_ERROR_MESSAGE.MIN_NUMBER(0))
    .test("no-leading-zero", APP_ERROR_MESSAGE.MIN_NUMBER(0), (value) => {
      return value && FormatService.toNumber(value) !== 0;
    }),
});
