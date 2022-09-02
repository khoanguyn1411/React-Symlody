import { GlobalTypes } from "@/global";

export const Title: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex items-center flex-1">
      <h1 className="mr-4 font-bold min-w-max"> {children}</h1>
    </div>
  );
};
