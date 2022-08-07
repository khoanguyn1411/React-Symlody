import React, { useEffect, useState } from "react";

import { Button, Dropdown, Select } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync } from "@/features/reducers";
import { IMember } from "@/features/types/member-type";
import { useModal } from "@/hooks";

import { MemberMapper } from "./mapper";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { ListMemberSkeleton } from "./member-skeleton";

export const MemberContainer: React.FC = () => {
  const propsModalCreateMember = useModal();
  const propsModalEditMember = useModal<IMember>();
  const memberStore = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();

  const displayOptions = [
    "Tất cả thành viên",
    "Trong nhiệm kỳ",
    "Hết nhiệm kỳ",
  ];
  useEffect(() => {
    dispatch(getMembersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState<string>(displayOptions[0]);
  const handleSelectMenu = (key: string, item: IMember) => {
    switch (key) {
      case "Chỉnh sửa thành viên":
        propsModalEditMember.setData(item);
        propsModalEditMember.setShow();
        break;
      case "Lưu trữ thành viên":
        // code block
        break;
      default:
        throw new Error("Invalid input.");
    }
  };

  if (!memberStore.members || memberStore.members.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý thành viên</h1>
        <div className="flex items-center justify-center">
          <Select
            className="w-44"
            list={displayOptions}
            value={filter}
            onChange={setFilter}
          ></Select>
          <Button
            className="px-3 py-2 ml-5"
            onClick={propsModalCreateMember.setShow}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="p-default">
        <div className="mt-3 bg-white border border-gray-200 rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-20 py-2 font-semibold text-center">STT</td>
                <td className="py-2 pr-6 font-semibold text-left">Họ và tên</td>
                <td className="py-2 font-semibold text-left">Ban</td>
                <td className="py-2 pr-6 font-semibold text-left">Ngày sinh</td>
                <td className="py-2 font-semibold text-left pr-default">
                  Vị trí
                </td>
              </tr>
              {memberStore.pending && <ListMemberSkeleton />}
              {memberStore &&
                memberStore.members.map((item, index) => {
                  const memberTableItem = MemberMapper.toTableView(item);
                  return (
                    <tr
                      className="text-left border-t border-gray-200"
                      key={memberTableItem.id}
                    >
                      <td className="w-20 py-2 font-normal text-center">
                        {index + 1}
                      </td>
                      <td className="w-auto py-2 pr-6 font-normal">
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-3 rounded-full bg-primary-800"></div>
                          <div>
                            <h1 className="font-semibold">
                              {memberTableItem.name}
                            </h1>
                            <h1 className="text-sm">{memberTableItem.email}</h1>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 pr-6 font-normal w-28">
                        {memberTableItem.department}
                      </td>
                      <td className="py-2 pr-6 font-normal w-28">
                        {memberTableItem.birthday}
                      </td>
                      <td className="py-2 font-normal w-28 pr-default">
                        {memberTableItem.roles}
                      </td>

                      <td className="w-8 py-2 font-normal">
                        <Dropdown
                          menus={[
                            {
                              key: "Chỉnh sửa thành viên",
                              prefix: <i className="w-6 far fa-edit"></i>,
                            },
                            {
                              key: "Lưu trữ thành viên",
                              prefix: <i className="w-6 far fa-trash-alt"></i>,
                            },
                          ]}
                          onClickMenu={(key) => handleSelectMenu(key, item)}
                        >
                          <span className="text-primary-800">
                            <i className="fas fa-ellipsis-h"></i>
                          </span>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEditMember {...propsModalEditMember} />
      <ModalCreateMember {...propsModalCreateMember} />
    </div>
  );
};
