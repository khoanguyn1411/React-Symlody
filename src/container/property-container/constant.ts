import { images } from "@/assets/images";

import { TFormPropertyInfo } from "./type";

export const ASSET_NO_DATA_CONFIG = {
  title: "Thêm tài sản mới",
  content:
    "Lập danh sách tài sản và quản lý tài sản một cách dễ dàng và tiện lợi.",
  buttonTitle: "Thêm tài sản",
  imageSrc: images.noData.asset,
} as const;

export const assetList: TFormPropertyInfo[] = [
  {
    assetName: "Lamborghini",
    quantity: "30",
    price: "",
    inCharge: "Nguyễn Thị A",
    owner: "Câu lạc bộ",
  },
  {
    assetName: "Voi 9 ngà",
    quantity: "30",
    price: "120000",
    inCharge: "Nguyễn Thị A",
    owner: "Câu lạc bộ",
  },
  {
    assetName: "Gà chín cựa ",
    quantity: "30",
    price: "120000",
    inCharge: "Nguyễn Thị A",
    owner: "Khoa Nguyen",
  },
  {
    assetName: "Ngựa chín sừng heo",
    quantity: "30",
    price: "120000",
    inCharge: "Nguyễn Thị A",
    owner: "Câu lạc bộ",
  },
  {
    assetName: "Mặt trăng",
    quantity: "30",
    price: "1230000",
    inCharge: "Nguyễn Thị A",
    owner: "Câu lạc bộ",
  },
];
