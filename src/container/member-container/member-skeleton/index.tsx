import React from "react";

export const ListMemberSkeleton = () => {
  return (
    <>
      {Array(4).map((item, index) => (
        <tr className="text-left border-t border-gray-200" key={item.id}>
          <td className="w-20 py-2 font-normal text-center">{index + 1}</td>
          <td className="w-auto py-2 pr-6 font-normal"></td>
          <td className="py-2 pr-6 font-normal w-1/10"></td>
          <td className="py-2 pr-6 font-normal w-1/10"></td>
          <td className="py-2 font-normal w-1/10 pr-default"></td>

          <td className="w-6 py-2 font-normal pr-default"></td>
        </tr>
      ))}
    </>
  );
};
