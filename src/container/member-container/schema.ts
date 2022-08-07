import * as yup from "yup";
export const schema = yup.object().shape({
  fullName: yup.string().required("Họ tên được yêu cầu"),
  gender: yup.string().required("Giới tính được yêu cầu"),
  birthday: yup.string().required("Ngày sinh được yêu cầu"),
  department: yup.string().required("Phòng ban được yêu cầu"),
  role: yup.array().min(1, "Vị trí được yêu cầu").default([]),
  class: yup.string().required("Lớp được yêu cầu"),
  studentId: yup.string().required("MSSV được yêu cầu"),
  phone: yup.string().required("Số điện thoại được yêu cầu"),
  address: yup.string().required("Địa chỉ được yêu cầu"),
  home: yup.string().required("Quê quán được yêu cầu"),
  email: yup
    .string()
    .email("Trường này phải là email")
    .required("Email được yêu cầu"),
});
