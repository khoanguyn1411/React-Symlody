import { GlobalTypes } from "@/types";

export const TableHead: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <thead className="sticky top-0 z-10 bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
