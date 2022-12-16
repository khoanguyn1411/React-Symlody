import { GlobalTypes } from "@/utils";
import { CSSVarService } from "@/utils/funcs/css-var-service";

export const HeaderForTabHost: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div
      style={{ top: CSSVarService.get("header-height") }}
      className="sticky top-0 flex items-end justify-between h-16 bg-white border-b border-gray-200 z-[2] px-default"
    >
      {children}
    </div>
  );
};
