import * as yup from "yup";
export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(150, "Tên không được vượt quá 150 ký tự"),
  lastName: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(150, "Họ không được vượt quá 150 ký tự"),
  gender: yup.string().required("Vui lòng nhập trường này"),
  birthday: yup.string().required("Vui lòng nhập trường này").nullable(),
  department: yup.string().required("Vui lòng nhập trường này"),
  // role: yup.array().min(1, "Vị trí được yêu cầu").default([]),
  class: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(8, "Mã lớp không được vượt quá 8 ký tự"),
  studentId: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(10, "MSSV không được vượt quá 10 ký tự"),
  phone: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(11, "Số điện thoại không được vượt quá 11 ký tự"),
  address: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(300, "Địa chỉ không được vượt quá 300 ký tự"),
  home: yup
    .string()
    .required("Vui lòng nhập trường này")
    .max(100, "Quê quán không được vượt quá 100 ký tự"),
  email: yup
    .string()
    .email("Trường này phải là email")
    .required("Vui lòng nhập trường này")
    .max(254, "Email không được vượt quá 254 ký tự"),
});
