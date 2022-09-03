import { GlobalTypes } from "@/global";

export const TableContainer: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="h-table">
      <div className="border rounded-md">
        <div className="overflow-auto max-h-table rounded-md">
          <div className="bg-white border-gray-200 rounded-t-lg rounded-md">
            <table className="w-full border-separate border-spacing-0">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
