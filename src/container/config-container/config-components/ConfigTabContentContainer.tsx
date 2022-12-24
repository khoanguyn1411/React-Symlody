import { AppReact } from "@/utils/types";

export const ConfigTabContentContainer: AppReact.FC.Children = ({
  children,
}) => {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-md">
      {children}
    </div>
  );
};
