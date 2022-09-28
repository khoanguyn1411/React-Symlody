import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập thông tin"),
  shortName: yup.string().required("Vui lòng nhập thông tin"),
  email: yup
    .string()
    .email("Trường này phải là email.")
    .required("Vui lòng nhập thông tin"),
  phone: yup.string().required("Vui lòng nhập thông tin"),
  schoolBelonged: yup.string().required("Vui lòng nhập thông tin"),
  address: yup.string().required("Vui lòng nhập thông tin"),
});
