import * as yup from "yup";
export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Tên được yêu cầu")
    .max(150, "Tên không được vượt quá 150 ký tự"),
  lastName: yup
    .string()
    .required("Họ được yêu cầu")
    .max(150, "Họ không được vượt quá 150 ký tự"),
  gender: yup.string().required("Giới tính được yêu cầu"),
  birthday: yup.string().required("Ngày sinh được yêu cầu").nullable(),
  department: yup.string().required("Phòng ban được yêu cầu"),
  role: yup.array().min(1, "Vị trí được yêu cầu").default([]),
  class: yup
    .string()
    .required("Lớp được yêu cầu")
    .max(8, "Họ không được vượt quá 8 ký tự"),
  studentId: yup
    .string()
    .required("MSSV được yêu cầu")
    .max(10, "MSSV không được vượt quá 10 ký tự"),
  phone: yup
    .string()
    .required("Số điện thoại được yêu cầu")
    .max(11, "Số điện thoại không được vượt quá 11 ký tự"),
  address: yup
    .string()
    .required("Địa chỉ được yêu cầu")
    .max(300, "Địa chỉ không được vượt quá 300 ký tự"),
  home: yup
    .string()
    .required("Quê quán được yêu cầu")
    .max(100, "Quê quán không được vượt quá 100 ký tự"),
  email: yup
    .string()
    .email("Trường này phải là email")
    .required("Email được yêu cầu")
    .max(254, "Email không được vượt quá 254 ký tự"),
});
