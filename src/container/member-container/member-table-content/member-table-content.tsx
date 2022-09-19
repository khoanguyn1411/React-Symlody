import { useState } from "react";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { memberSelectors } from "@/features/reducers";
import { IMember } from "@/features/types";

import { MemberTableMapper } from "../mapper";
import { TableMemberSkeleton } from "../member-skeleton";

type TProps = {
  onEdit: (member: IMember) => void;
  onDelete: (member: IMember) => void;
};

export const TableMemberContent: React.FC<TProps> = ({ onEdit, onDelete }) => {
  const memberStore = useAppSelector((state) => state.member);
  const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const [currentDeleteId, setCurrentDeleteId] = useState<number>();

  const handleEdit = (item: IMember) => () => {
    onEdit(item);
  };
  const handleDelete = (item: IMember) => () => {
    onDelete(item);
    setCurrentDeleteId(item.id);
  };

  if (memberStore.pending) {
    return <TableMemberSkeleton />;
  }

  if (memberCount === 0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <Table.Body>
      {memberList.map((item, index) => {
        const memberTableItem = MemberTableMapper.fromModel(item);
        return (
          <Table.Row key={memberTableItem.id} index={index}>
            <Table.Cell width="5rem" textAlign="center">
              {index + 1}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                <div className="mr-3">
                  <Avatar
                    size="medium"
                    src={memberTableItem.avatar}
                    fullName={memberTableItem.name}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">{memberTableItem.name}</h1>
                  <h1 className="text-sm">{memberTableItem.email}</h1>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell keySorting="department" width="10rem">
              {memberTableItem.department}
            </Table.Cell>
            <Table.Cell width="8rem">{memberTableItem.birthday}</Table.Cell>
            <Table.Cell width="12rem">{memberTableItem.roles}</Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowLoading={
                  memberStore.pendingDeleteMember && currentDeleteId === item.id
                }
                title="Xóa thành viên?"
                handleEvent={{
                  edit: handleEdit(item),
                  delete: handleDelete(item),
                }}
              />
            </Table.CellAction>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};
