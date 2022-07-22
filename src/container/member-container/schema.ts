import * as yup from "yup";
export const schema = yup.object().shape({
  fullName: yup.string().required("Họ tên được yêu cầu"),
  gender: yup.string().required("Họ tên được yêu cầu"),
  birthday: yup.string().required("Họ tên được yêu cầu"),
  department: yup.string().required("Họ tên được yêu cầu"),
  role: yup.string().required("Họ tên được yêu cầu"),
  class: yup.string().required("Họ tên được yêu cầu"),
  id: yup.string().required("Họ tên được yêu cầu"),
  phone: yup.string().required("Họ tên được yêu cầu"),
  address: yup.string().required("Họ tên được yêu cầu"),
  home: yup.string().required("Họ tên được yêu cầu"),
  email: yup
    .string()
    .email("Trường này phải là email")
    .required("Email được yêu cầu"),
});
