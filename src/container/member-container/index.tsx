import React, { Fragment, useEffect, useState } from "react";

import {
  Button,
  DeleteAndEditField,
  Pagination,
  Search,
  Select,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMembersAsync } from "@/features/reducers";
import { IMember } from "@/features/types/member-type";
import { useModal, useSearch } from "@/hooks";

import { displayOptions } from "./constant";
import { MemberMapper } from "./mapper";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { ListMemberSkeleton } from "./member-skeleton";

export const MemberContainer: React.FC = () => {
  const propsModalCreateMember = useModal();
  const propsModalEditMember = useModal<IMember>();
  const propsSearch = useSearch();
  const memberStore = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMembersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState<string>(displayOptions[0]);
  const handleEdit = (item: IMember) => () => {
    propsModalEditMember.setData(item);
    propsModalEditMember.setShow();
  };
  const handleDelete = (item: IMember) => () => {
    alert("Deleted");
  };

  if (!memberStore.members || memberStore.members.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <div className="flex items-center">
          <h1 className="mr-4 font-bold min-w-max">QUẢN LÝ THÀNH VIÊN</h1>
          <Search placeholder="Nguyễn Thị A, ..." {...propsSearch} />
        </div>
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
        <div className="bg-white border-gray-200">
          <table className="w-full">
            <tbody>
              {memberStore.pending && <ListMemberSkeleton />}
              {!memberStore.pending && (
                <>
                  <tr>
                    <td className="w-20 py-2 font-semibold text-center">STT</td>
                    <td className="py-2 pr-6 font-semibold text-left">
                      Họ và tên
                    </td>
                    <td className="py-2 font-semibold text-left">Ban</td>
                    <td className="py-2 pr-6 font-semibold text-left">
                      Ngày sinh
                    </td>
                    <td className="py-2 font-semibold text-left pr-default">
                      Vị trí
                    </td>
                  </tr>
                  {memberStore.members.map((item, index) => {
                    const memberTableItem = MemberMapper.toTableView(item);
                    return (
                      <Fragment key={index}>
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
                                <h1 className="text-sm">
                                  {memberTableItem.email}
                                </h1>
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

                          <td className="w-8 py-2 pr-4 font-normal">
                            <DeleteAndEditField
                              title="Xóa thành viên?"
                              handleEvent={{
                                edit: handleEdit(item),
                                delete: handleDelete(item),
                              }}
                            />
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
        {!memberStore.pending && (
          <div className="flex justify-end w-full mt-5">
            <Pagination
              onRowQuantityChange={(activeRows) => console.log(activeRows)}
              onPaginationChange={(activePage) => console.log(activePage)}
              totalPages={150}
              pageStep={1}
            />
          </div>
        )}
      </div>
      <ModalCreateMember {...propsModalCreateMember} />
      <ModalEditMember {...propsModalEditMember} />
    </div>
  );
};
