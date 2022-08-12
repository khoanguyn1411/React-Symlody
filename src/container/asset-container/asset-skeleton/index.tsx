import React from "react";

import { Skeleton } from "@/components";

export const AssetSkeleton = () => {
  const count = 5;
  return (
    <>
      {[...Array(count)].map((item, index) => (
        <tr key={index} className="text-left border-t border-gray-200">
          <td className="w-20 px-2 py-2 font-normal text-center">
            <Skeleton />
          </td>

          <td className="py-2 font-normal min-w-[200px]">
            <Skeleton />
          </td>

          <td className="w-24 px-2 py-2 font-normal text-center">
            <Skeleton />
          </td>
          <td className="w-32 py-2 font-normal text-center">
            <Skeleton />
          </td>

          <td className="px-2 py-2 font-normal text-center w-52">
            <Skeleton />
          </td>
          <td className="w-32 py-2 font-normal text-center">
            <Skeleton />
          </td>
          <td className="w-20 px-2 py-2 font-normal">
            <Skeleton />
          </td>
        </tr>
      ))}
    </>
  );
};
