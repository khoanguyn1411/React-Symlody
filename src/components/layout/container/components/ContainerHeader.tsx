import { AppReact } from "@/utils/types";

export const Header: AppReact.FC.Children = ({ children }) => {
  return (
    <div className="sticky flex items-center justify-between py-3 bg-white border-b border-gray-200 h-header-container z-[2] px-default">
      {children}
    </div>
  );
};
