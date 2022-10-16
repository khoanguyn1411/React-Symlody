import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { FormatService } from "@/utils";
import { StrictPick } from "@/utils/types";

import { IFormPropertyInfo } from "./type";
type IPropertySchema = StrictPick<
  IFormPropertyInfo,
  "assetName" | "inChargeId" | "owner" | "quantity"
>;
export const schema: yup.SchemaOf<IPropertySchema> = yup.object().shape({
  assetName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  owner: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  inChargeId: yup.number().required(APP_ERROR_MESSAGE.REQUIRED).nullable(),
  quantity: yup
    .string()
    .required(APP_ERROR_MESSAGE.REQUIRED)
    .test("no-leading-zero", APP_ERROR_MESSAGE.MIN_NUMBER(0), (value) => {
      return value && FormatService.toNumber(value) !== 0;
    })
    .test("no-overload-32767", APP_ERROR_MESSAGE.MAX_NUMBER(32767), (value) => {
      return value && FormatService.toNumber(value) <= 32767;
    }),
});
