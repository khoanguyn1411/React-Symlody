import * as yup from "yup";

import { FormatService } from "@/utils";
export const schema = yup.object().shape({
  assetName: yup.string().required("Vui lòng nhập trường này"),
  inCharge: yup.string().required("Vui lòng nhập trường này"),
  owner: yup.string().required("Vui lòng nhập trường này"),
  quantity: yup
    .string()
    .required("Vui lòng nhập trường này")
    .min(1, "Vui lòng nhập một số lớn hơn 0")
    .test("no-leading-zero", "Vui lòng nhập một số lớn hơn 0", (value) => {
      return value && FormatService.toNumber(value) !== 0;
    }),
});
