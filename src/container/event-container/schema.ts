import * as yup from "yup";
export const schema = yup.object().shape({
  eventName: yup.string().required("Tên tài sản được yêu cầu"),
  startTime: yup.string().required("Người chịu trách nhiệm được yêu cầu"),
  endTime: yup.string().required("Chủ sở hữu được yêu cầu"),
  place: yup.string().required("Số lượng được yêu cầu"),
  status: yup.string().required("Trang"),
  department: yup.string().required("Trang"),
  description: yup.string(),
});
