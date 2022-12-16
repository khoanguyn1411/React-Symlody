import { GlobalTypes } from "@/utils";
import { CSSVar } from "@/utils/funcs/css-var";

export const HeaderForTabHost: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div
      style={{ top: CSSVar.get("header-height") }}
      className="sticky top-0 flex items-end justify-between h-16 bg-white border-b border-gray-200 z-[2] px-default"
    >
      {children}
    </div>
  );
};
