import { GlobalTypes } from "@/utils";

export const Header: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="sticky flex items-center justify-between py-3 bg-white border-b border-gray-200 h-header-container z-[2] px-default">
      {children}
    </div>
  );
};
