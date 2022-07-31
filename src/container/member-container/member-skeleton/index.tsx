const MemberSkeleton: React.FC = () => {
  return (
    <tr className="text-left border-t border-gray-200">
      <td className=" w-20 py-2  font-normal text-center"></td>
      <td className="w-auto py-2 pr-6 font-normal">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 bg-gray-100 rounded-full animate-pulse"></div>
          <div className="flex flex-col space-y-2">
            <div className="w-16 h-4 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </td>
      <td className="py-2 pr-6 font-normal w-1/10">
        <div className="flex items-center justify-center w-20 h-4 bg-gray-100 rounded-full animate-pulse"></div>
      </td>
      <td className="py-2 pr-6 font-normal w-1/10">
        <div className="flex items-center justify-center w-20 h-4 bg-gray-100 rounded-full animate-pulse"></div>
      </td>
      <td className="py-2 pr-6 font-normal w-1/10">
        <div className="flex items-center justify-center w-20 h-4 bg-gray-100 rounded-full animate-pulse"></div>
      </td>
    </tr>
  );
};

type Props = {
  length?: number;
};

export const ListMemberSkeleton: React.FC<Props> = ({ length = 3 }) => {
  return (
    <>
      {Array.from({ length }).map((_, idx) => (
        <MemberSkeleton key={idx} />
      ))}
    </>
  );
};
