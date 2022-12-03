import { useMemo, useState } from "react";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { Member } from "@/features/types";

import { MemberTableMapper } from "../mapper";

type TProps = {
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onRestore: (member: Member) => void;
};

export const MemberTableContent: React.FC<TProps> = ({
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
    const { page, limit } = memberStore.listQueryMemberFE;
    return (index: number) => (page - 1) * limit + index + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStore.listQueryMemberFE.limit, memberStore.listQueryMemberFE.page]);

  const handleEdit = (item: Member) => () => {
    onEdit(item);
  };
  const handleDelete = (item: Member) => () => {
    onDelete(item);
    setCurrentInteractiveId(item.id);
  };

  const handleRestore = (item: Member) => () => {
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
      {memberStore.memberListPagination.map((item, index) => {
        const memberTableItem = MemberTableMapper.fromModel(item);
        const isPending =
          memberStore.pendingDeleteMember || memberStore.pendingRestoreMember;
        const isSameId = currentInteractiveId === item.id;
        const shouldShowLoadingOfRestoreButton = isPending && isSameId;
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
                isShowLoading={shouldShowLoadingOfRestoreButton}
                isShowRestore={item.isArchived}
                title="Lưu trữ thành viên?"
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
