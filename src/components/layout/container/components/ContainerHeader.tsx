import { CSSService, GlobalTypes } from "@/utils";

export const Header: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div
      className="sticky flex items-center justify-between h-16 py-3 bg-white border-b border-gray-200 z-[2] px-default"
      style={{ top: CSSService.getCSSVar("header-height") }}
    >
      {children}
    </div>
  );
};
