import { GlobalTypes } from "@/utils";

export const Header: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="sticky z-10 flex items-center justify-between h-16 py-3 bg-white border-b border-gray-200 top-[56px] px-default">
      {children}
    </div>
  );
};
