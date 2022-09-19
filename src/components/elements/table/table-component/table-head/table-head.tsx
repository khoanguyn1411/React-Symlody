import { GlobalTypes } from "@/global";

export const TableHead: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <thead className="sticky top-0 bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
