import * as yup from "yup";
export const schema = yup.object().shape({
  eventName: yup.string().required("Vui lòng nhập trường này"),
  startTime: yup.string().required("Vui lòng nhập trường này"),
  endTime: yup.string().required("Vui lòng nhập trường này"),
  place: yup.string().required("Vui lòng nhập trường này"),
  status: yup.string().required("Vui lòng nhập trường này"),
  department: yup.string().required("Vui lòng nhập trường này"),
  description: yup.string(),
});
