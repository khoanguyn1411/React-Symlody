import { AppReact } from "@/utils/types";

export const Title: AppReact.FC.Children = ({ children }) => {
  return (
    <div className="flex items-center flex-1">
      <h1 className="mr-4 font-bold min-w-max"> {children}</h1>
    </div>
  );
};
