import { GlobalTypes } from "@/global";

export const HeaderRight: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center justify-center space-x-4">{children}</div>
  );
};
