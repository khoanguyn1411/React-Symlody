import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export const TableContainer: React.FC<TProps> = ({ children }) => {
  return (
    <div className="overflow-auto h-table rounded-md">
      <div className="bg-white border border-gray-200 rounded-t-lg rounded-md">
        <table className="w-full border-separate border-spacing-0">
          {children}
        </table>
      </div>
    </div>
  );
};
