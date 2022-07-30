import * as yup from "yup";
export const schema = yup.object().shape({
  username: yup.string().required("Tên đăng nhập được yêu cầu"),
  password: yup.string().required("Mật khẩu được yêu cầu"),
});
