import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
export const schema = yup.object().shape({
  eventName: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  startTime: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  endTime: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  place: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  status: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  department: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  description: yup.string(),
});
