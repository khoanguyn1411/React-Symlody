import { memo, useState } from "react";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { memberSelectors } from "@/features/reducers";
import { IMember } from "@/features/types";

import { MemberTableMapper } from "../mapper";

type TProps = {
  onEdit: (member: IMember) => void;
  onDelete: (member: IMember) => void;
  onRestore: (member: IMember) => void;
};

const _TableMemberContent: React.FC<TProps> = ({
  onEdit,
  onRestore,
  onDelete,
}) => {
  const memberStore = useAppSelector((state) => state.member);
  const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberList = useAppSelector(memberSelectors.selectAll);

  const [currentInteractiveId, setCurrentInteractiveId] = useState<number>();

  const handleEdit = (item: IMember) => () => {
    onEdit(item);
  };
  const handleDelete = (item: IMember) => () => {
    onDelete(item);
    setCurrentInteractiveId(item.id);
  };

  const handleRestore = (item: IMember) => () => {
    onRestore(item);
    setCurrentInteractiveId(item.id);
  };

  if (memberStore.pending) {
    return <Table.Skeleton colsNumber={6} />;
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
            <Table.Cell textAlign="center">{index + 1}</Table.Cell>
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
            <Table.Cell keySorting="department">
              {memberTableItem.department}
            </Table.Cell>
            <Table.Cell>{memberTableItem.birthday}</Table.Cell>
            <Table.Cell>{memberTableItem.roles}</Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowLoading={
                  (memberStore.pendingDeleteMember ||
                    memberStore.pendingRestoreMember) &&
                  currentInteractiveId === item.id
                }
                isShowRestore={item.is_archived}
                title="Xóa thành viên?"
                handleEvent={{
                  restore: handleRestore(item),
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

export const TableMemberContent = memo(_TableMemberContent);
