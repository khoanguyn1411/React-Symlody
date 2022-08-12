import React from "react";

export const PaginationPickPage: React.FC = () => {
  return (
    <div className="flex border-l border-gray-300 place-self-stretch">
      <input
        className="w-32 h-full px-2 rounded-r-md focus:outline-none"
        placeholder="Chọn trang"
        type="number"
      />
    </div>
  );
};
