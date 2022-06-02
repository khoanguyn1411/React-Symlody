import * as yup from "yup";
export const schema = yup.object().shape({
  email: yup.string().email().required("Email được yêu cầu"),
  password: yup.string().required("Mật khẩu được yêu cầu"),
});
