import { GlobalTypes } from "@/utils";

export const HeaderRight: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full space-x-4">
      {children}
    </div>
  );
};
