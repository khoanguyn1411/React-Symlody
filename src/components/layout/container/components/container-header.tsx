import { GlobalTypes } from "@/global";

export const Header: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center justify-between h-16 py-3 bg-white border-b border-gray-200 px-default">
      {children}
    </div>
  );
};
