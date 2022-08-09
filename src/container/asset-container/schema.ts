import * as yup from "yup";
export const schema = yup.object().shape({
  assetName: yup.string().required("Tên tài sản được yêu cầu"),
  price: yup.string().required("Đơn giá được yêu cầu"),
  inCharge: yup.string().required("Người chịu trách nhiệm được yêu cầu"),
  owner: yup.string().required("Chủ sở hữu được yêu cầu"),
});
