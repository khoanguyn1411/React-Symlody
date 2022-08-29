import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Avatar,
  Button,
  DeleteAndEditField,
  Pagination,
  Search,
  Select,
  Table,
  TableBody,
  TableCell,
  TableCellAction,
  TableCellHead,
  TableCellHeadAction,
  TableHead,
  TableRow,
  TItemListSelect,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  deleteMemberAsync,
  getMembersAsync,
  setListQueryMember,
} from "@/features/reducers";
import { IMember } from "@/features/types";
import { useModal, useSearch } from "@/hooks";

import {
  MEMBER_FILTER_OPTIONS,
  MEMBER_FILTER_VALUE,
  MEMBER_MESSAGE,
} from "./constant";
import { MemberTableMapper } from "./mapper";
import { ModalCreateMember, ModalEditMember } from "./member-modal";
import { TableMemberSkeleton } from "./member-skeleton";

export const MemberContainer: React.FC = () => {
  const propsModalCreateMember = useModal();
  const propsModalEditMember = useModal<IMember>();
  const propsSearch = useSearch();
  const memberStore = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>(MEMBER_FILTER_OPTIONS[0].value);

  const handleSetFilter = useCallback(
    (item: TItemListSelect) => {
      console.log(item);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { is_archived, get_all, ...rest } = memberStore.listQueryMember;
      switch (item.key) {
        case MEMBER_FILTER_VALUE.all:
          dispatch(setListQueryMember({ ...rest, get_all: true }));
          return;
        case MEMBER_FILTER_VALUE.isArchived:
          dispatch(setListQueryMember({ ...rest, is_archived: true }));
          break;
        case MEMBER_FILTER_VALUE.active:
          dispatch(setListQueryMember({ rest }));
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  useEffect(() => {
    dispatch(getMembersAsync(memberStore.listQueryMember));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStore.listQueryMember]);

  const handleEdit = (item: IMember) => () => {
    propsModalEditMember.setData(item);
    propsModalEditMember.toggle.setShow();
  };
  const handleDelete = (item: IMember) => async () => {
    const result = await dispatch(deleteMemberAsync(item.id));
    if (result.payload) {
      toast.success(MEMBER_MESSAGE.delete.success);
      await dispatch(getMembersAsync(memberStore.listQueryMember));
      return;
    }
    toast.success(MEMBER_MESSAGE.delete.error);
  };

  const TableComponent: React.FC = () => {
    if (memberStore.pending) {
      return <TableMemberSkeleton />;
    }
    if (!memberStore.members || memberStore.members.length === 0) {
      return <div>No data</div>;
    }
    return (
      <>
        <Table>
          <TableHead>
            <TableCellHead isFirst width="5rem" textAlign="center">
              STT
            </TableCellHead>
            <TableCellHead>Họ và tên</TableCellHead>
            <TableCellHead width="6rem">Ban</TableCellHead>
            <TableCellHead width="8rem">Ngày sinh</TableCellHead>
            <TableCellHead width="18rem">Vị trí</TableCellHead>
            <TableCellHeadAction />
          </TableHead>
          <TableBody>
            {memberStore.members.map((item, index) => {
              const memberTableItem = MemberTableMapper.fromModel(item);
              return (
                <TableRow key={memberTableItem.id}>
                  <TableCell width="5rem" textAlign="center">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Avatar
                          size="medium"
                          src={memberTableItem.avatar}
                          fullName={memberTableItem.name}
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold">
                          {memberTableItem.name}
                        </h1>
                        <h1 className="text-sm">{memberTableItem.email}</h1>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell width="6rem">
                    {memberTableItem.department}
                  </TableCell>
                  <TableCell width="8rem">{memberTableItem.birthday}</TableCell>
                  <TableCell width="18rem">{memberTableItem.roles}</TableCell>

                  <TableCellAction>
                    <DeleteAndEditField
                      title="Xóa thành viên?"
                      handleEvent={{
                        edit: handleEdit(item),
                        delete: handleDelete(item),
                      }}
                    />
                  </TableCellAction>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex justify-end w-full mt-5">
          <Pagination
            onRowQuantityChange={(activeRows) => console.log(activeRows)}
            onPaginationChange={(activePage) => console.log(activePage)}
            totalPages={150}
            pageStep={1}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <div className="flex-1">
          <h1 className="mr-4 font-bold min-w-max">QUẢN LÝ THÀNH VIÊN</h1>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Search placeholder="Tìm kiếm ..." {...propsSearch} />

          <Select
            className="w-44"
            classNameDisplay="h-10"
            list={MEMBER_FILTER_OPTIONS}
            value={filter}
            onChangeSideEffect={handleSetFilter}
            onChange={setFilter}
          />
          <Button
            prefix={<i className="mr-2 fas fa-plus-circle" />}
            onClick={propsModalCreateMember.toggle.setShow}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="p-default">
        <TableComponent />
      </div>
      <ModalCreateMember {...propsModalCreateMember} />
      <ModalEditMember {...propsModalEditMember} />
    </div>
  );
};
