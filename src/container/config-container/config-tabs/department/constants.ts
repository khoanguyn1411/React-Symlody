import { generateStatusMessageFor } from "@/utils/funcs/generate-app-status-messages";

export const DEPARTMENT_MESSAGE = {
  ...generateStatusMessageFor("phòng ban"),
  title: {
    needToMoveMembers:
      "Bạn cần chuyển thành viên sang phòng ban khác trước khi xoá!",
    confirmDelete: "Bạn có chắc muốn xoá phòng ban?",
  },
};
