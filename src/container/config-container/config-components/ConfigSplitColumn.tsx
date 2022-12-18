import { AppReact } from "@/utils/types";

export const ConfigSplitColumn: AppReact.FC.Children = ({ children }) => {
  return <div className="mt-8 grid grid-cols-2 gap-4">{children}</div>;
};
