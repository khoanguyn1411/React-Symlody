import { GlobalTypes } from "@/global";

export const TableContainer: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="overflow-auto h-table rounded-md">
      <div className="bg-white border border-t-0 border-gray-200 rounded-t-lg rounded-md">
        <table className="w-full border-separate border-spacing-0">
          {children}
        </table>
      </div>
    </div>
  );
};
