import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { generateArrayFromEnum } from "@/utils/services/generate-service";

import { TEventTable } from "./type";

export enum EEventStatus {
  Incoming = "Sắp diễn ra",
  Ongoing = "Đang diễn ra",
  End = "Đã kết thúc",
}

export const TABLE_EVENT_DATA: TEventTable[] = [
  {
    eventName: "Training nội bộ về NCKH",
    time: "13:00 - 14:00 25/08/2022 ",
    status: EEventStatus.Incoming,
  },
  {
    eventName: "Training nội bộ về NCKH",
    time: "13:00 - 14:00 25/08/2022 ",
    status: EEventStatus.Ongoing,
  },
  {
    eventName: "Training nội bộ về NCKH",
    time: "13:00 - 14:00 25/08/2022 ",
    status: EEventStatus.End,
  },
];

export const EVENT_NO_DATA_CONFIG: TNodataConfig = {
  title: "Tạo sự kiện",
  content: "Lên lịch và quản lý các sự kiện một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo sự kiện",
  imageSrc: images.noData.event,
};

export const EVENT_STATUS_LIST_OPTIONS: TOptionProps[] = [
  "Tất cả sự kiện",
  ...generateArrayFromEnum(EEventStatus),
].map((item) => ({ value: item, label: item }));
