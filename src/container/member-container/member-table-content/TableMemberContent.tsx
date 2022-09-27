import { memo, useCallback, useMemo, useState } from "react";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
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

  // TO_UPDATE: When BE release pagination, change it to the original memberCount:
  // const memberCount = useAppSelector(memberSelectors.selectTotal);
  const memberCount = memberStore.currentMemberList.length;

  const [currentInteractiveId, setCurrentInteractiveId] = useState<number>();

  const getMemberIndex = useMemo(() => {
    return (index: number) =>
      (memberStore.listQueryMemberFE.page - 1) *
        memberStore.listQueryMemberFE.limit +
      index +
      1;
  }, [memberStore.listQueryMemberFE.limit, memberStore.listQueryMemberFE.page]);

  const handleEdit = useCallback(
    (item: IMember) => () => {
      onEdit(item);
    },
    [onEdit]
  );
  const handleDelete = useCallback(
    (item: IMember) => () => {
      onDelete(item);
      setCurrentInteractiveId(item.id);
    },
    [onDelete]
  );

  const handleRestore = useCallback(
    (item: IMember) => () => {
      onRestore(item);
      setCurrentInteractiveId(item.id);
    },
    [onRestore]
  );

  if (memberStore.pending) {
    return <Table.Skeleton colsNumber={6} />;
  }

  if (memberCount === 0) {
    return <Table.NoData colsNumber={6} />;
  }

  return (
    <Table.Body>
      {memberStore.memberListPagination.map((item, index) => {
        const memberTableItem = MemberTableMapper.fromModel(item);
        return (
          <Table.Row key={memberTableItem.id} index={index}>
            <Table.Cell textAlign="center">{getMemberIndex(index)}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                <div className="mr-3">
                  <Avatar
                    size="medium"
                    src={memberTableItem.avatar}
                    fullName={memberTableItem.firstName}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">{memberTableItem.fullName}</h1>
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
