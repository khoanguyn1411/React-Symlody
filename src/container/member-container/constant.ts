export const displayOptions = [
  "Tất cả thành viên",
  "Trong nhiệm kỳ",
  "Hết nhiệm kỳ",
] as const;

export const getListRole = () => {
  return [
    "Người quản lý thành viên",
    "Người quản lý sự kiện",
    "Người quản lý tài sản",
    "Người quản lý thông báo",
    "Trưởng ban",
  ];
};