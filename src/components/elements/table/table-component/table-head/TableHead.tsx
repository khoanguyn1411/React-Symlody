import { AppReact } from "@/utils/types";

export const TableHead: AppReact.FC.Children = ({ children }) => {
  return (
    <thead className="sticky top-0 z-[1] bg-primary-50">
      <tr>{children}</tr>
    </thead>
  );
};
