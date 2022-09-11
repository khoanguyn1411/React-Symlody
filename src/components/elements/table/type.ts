export const TEXT_ALIGN_MAP = {
  left: "text-left w-full",
  center: "text-center w-full",
  right: "text-right w-full",
} as const;

export type TTableItem<T> = {
  dataSource: T;
  index: number;
  onEdit: (dataSource: T) => void;
  onDelete: (dataSource: T) => void;
};
