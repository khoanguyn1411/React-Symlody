import { AppReact } from "@/utils/types";

export const Body: AppReact.FC.Children = ({ children }) => {
  return <div className="p-default">{children}</div>;
};
