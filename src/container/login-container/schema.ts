import * as yup from "yup";
export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Trường này phải là email")
    .required("Email được yêu cầu"),
  password: yup.string().required("Mật khẩu được yêu cầu"),
});
