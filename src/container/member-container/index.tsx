import dayjs from "dayjs";
import React, { useEffect } from "react";

import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync } from "@/features/reducers";
import { useModal } from "@/hooks";

import { ModalCreateMember } from "./member-modal";
import { ListMemberSkeleton } from "./member-skeleton";

export const MemberContainer: React.FC = () => {
  const useModalProps = useModal();
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const isNotEmpty = memberStore.members.length > 0;

  useEffect(() => {
    dispatch(getMembersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBody = () => {
    if (memberStore.pending) return <ListMemberSkeleton />;
    return (
      <>
        {isNotEmpty ? (
          <>
            {memberStore.members.map((item, index) => (
              <tr className="text-left border-t border-gray-200" key={item.id}>
                <td className="w-20 py-2 font-normal text-center">
                  {index + 1}
                </td>
                <td className="w-auto py-2 pr-6 font-normal">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                    <div>
                      <h1 className="font-semibold">
                        {item.auth_account.first_name +
                          " " +
                          item.auth_account.last_name}
                      </h1>
                      <h1 className="text-sm">{item.auth_account.email}</h1>
                    </div>
                  </div>
                </td>
                <td className="py-2 pr-6 font-normal w-1/10">
                  {item.department.name}
                </td>
                <td className="py-2 pr-6 font-normal w-1/10">
                  {item.dob && dayjs(item.dob).format("DD/MM/YYYY")}
                </td>
                <td className="py-2 font-normal w-1/10 pr-default">
                  {item.auth_account.groups.join(", ")}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <div>No data</div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý thành viên</h1>
        <div className="flex items-center">
          <Button className="px-3 py-2" onClick={useModalProps.setShow}>
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="p-default">
        <div className="mt-3 bg-white border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-20 py-2 font-semibold text-center">STT</th>
                <th className="py-2 pr-6 font-semibold text-left">Họ và tên</th>
                <th className="py-2 font-semibold text-left">Ban</th>
                <th className="py-2 pr-6 font-semibold text-left">Ngày sinh</th>
                <th className="py-2 font-semibold text-left pr-default">
                  Vị trí
                </th>
              </tr>
            </thead>

            <tbody>{renderBody()}</tbody>
          </table>
        </div>
      </div>
      <ModalCreateMember {...useModalProps} />
    </div>
  );
};
