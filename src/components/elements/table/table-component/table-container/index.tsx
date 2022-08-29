import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export const TableContainer: React.FC<TProps> = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <table className="w-full">{children}</table>
    </div>
  );
};
