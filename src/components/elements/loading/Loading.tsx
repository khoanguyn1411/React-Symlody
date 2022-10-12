import React from "react";

export const Loading: React.FC = () => {
  return (
    <span className="flex items-center justify-center w-full p-4">
      <i className="animate-spin fas fa-spinner-third" />
    </span>
  );
};
