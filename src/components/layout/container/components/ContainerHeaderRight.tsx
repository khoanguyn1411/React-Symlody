import { AppReact } from "@/utils/types";

export const HeaderRight: AppReact.FC.Children = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full space-x-4">
      {children}
    </div>
  );
};
