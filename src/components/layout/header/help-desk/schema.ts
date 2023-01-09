import * as yup from "yup";

import { APP_ERROR_MESSAGE } from "@/constants";
import { HelpDesk } from "@/features/types";
import { YupValidation } from "@/utils/types";

export const schema = yup.object().shape<YupValidation<HelpDesk>>({
  title: yup.string().required(APP_ERROR_MESSAGE.REQUIRED),
  content: yup.string(),
  category: yup.string(),
});
