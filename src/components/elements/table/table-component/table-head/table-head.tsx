import { GlobalTypes } from "@/global";

export const TableHead: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <thead className="sticky top-0 z-[1] bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
