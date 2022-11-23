import { GeneratorService } from "@/utils";

export const DEPARTMENT_MESSAGE = {
  ...GeneratorService.generateStatusMessageFor("phòng ban"),
  title: {
    needToMoveMembers:
      "Bạn cần chuyển thành viên sang phòng ban khác trước khi xoá!",
    confirmDelete: "Bạn có chắc muốn xoá phòng ban?",
  },
};
