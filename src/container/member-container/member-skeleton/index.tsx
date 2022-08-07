import React from "react";

import { Skeleton } from "@/components";

export const ListMemberSkeleton: React.FC = () => {
  const count = 5;
  return (
    <>
      {[...Array(count)].map((item, index) => (
        <tr
          className="text-left border-t border-gray-200 animate-skeleton"
          key={index}
        >
          <td className="w-20 px-2 py-2 font-normal text-center">
            <Skeleton />
          </td>
          <td className="w-auto py-2 pr-2 font-normal">
            <Skeleton />
          </td>
          <td className="py-2 pr-2 font-normal w-28">
            <Skeleton />
          </td>
          <td className="py-2 pr-2 font-normal w-28">
            <Skeleton />
          </td>
          <td className="py-2 font-normal w-28 pr-default">
            <Skeleton />
          </td>
          <td className="w-8 py-2 font-normal"></td>
        </tr>
      ))}
    </>
  );
};
