import React from "react";

import { Avatar } from "@/components";

export const TodoMemberViewLoading: React.FC = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="border-2 border-white rounded-full cursor-pointer animate-skeleton"
        >
          <Avatar fullName="" isSkeletonLoading />
        </div>
      ))}
    </>
  );
};
