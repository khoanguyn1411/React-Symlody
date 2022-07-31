import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { Button, Dropdown, Select } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync } from "@/features/reducers";
import { useModal } from "@/hooks";

import { ModalCreateMember } from "./member-modal";

export const MemberContainer: React.FC = () => {
  const useModalProps = useModal();
  const dispatch = useAppDispatch();
  const memberList = useAppSelector((state) => state.member);

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
          <Button className="px-3 py-2 ml-5" onClick={useModalProps.setShow}>
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
              {memberList.members.map((item, index) => (
                <tr
                  className="text-left border-t border-gray-200"
                  key={item.id}
                >
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
                    {item.department}
                  </td>
                  <td className="py-2 pr-6 font-normal w-1/10">
                    {item.dob && dayjs(item.dob).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 font-normal w-1/10 pr-default">
                    {item.auth_account.groups.join(", ")}
                  </td>

                  <td className="w-6 py-2 font-normal pr-default">
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
                      onClickMenu={function (key: string): void {
                        console.log(key);
                      }}
                    >
                      <span className="text-primary-800">
                        <i className="far fa-ellipsis-h"></i>
                      </span>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCreateMember {...useModalProps} />
    </div>
  );
};
