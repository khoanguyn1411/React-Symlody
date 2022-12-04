import React, { useMemo, useState } from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { Property } from "@/features/types";

import { PropertyTableMapper } from "../mapper";

type TProps = {
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
  onRestore: (property: Property) => void;
};

export const PropertyTableContent: React.FC<TProps> = ({
  onEdit,
  onDelete,
  onRestore,
}) => {
  const [currentInteractiveId, setCurrentInteractiveId] = useState<number>();

  // TO_UPDATE: When BE release pagination, change it to the original propertyCount:
  // const propertyCount = useAppSelector(propertySelectors.selectTotal);
  const propertyStore = useAppSelector((state) => state.property);
  const propertyCount = propertyStore.currentPropertyList.length;

  const getPropertyIndex = useMemo(() => {
    const { page, limit } = propertyStore.listQueryProperty;
    return (index: number) => (page - 1) * limit + index + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    propertyStore.listQueryProperty.limit,
    propertyStore.listQueryProperty.page,
  ]);

  const handleEdit = (item: Property) => () => {
    onEdit(item);
  };
  const handleDelete = (item: Property) => () => {
    onDelete(item);
    setCurrentInteractiveId(item.id);
  };
  const handleRestore = (item: Property) => () => {
    onRestore(item);
  };

  if (propertyStore.pending) {
    return <Table.Skeleton colsNumber={7} />;
  }

  if (propertyCount === 0) {
    return <Table.NoData colsNumber={7} />;
  }
  return (
    <Table.Body>
      {propertyStore.propertyListPagination.map((item, index) => {
        const propertyTableItem = PropertyTableMapper.fromModel(item);
        const isPending =
          propertyStore.pendingDeleteProperty ||
          propertyStore.pendingRestoreProperty;
        const isSameId = currentInteractiveId === item.id;
        const shouldShowLoadingOfRestoreButton = isPending && isSameId;
        return (
          <Table.Row key={item.id} index={index}>
            <Table.Cell textAlign="center">
              {getPropertyIndex(index)}
            </Table.Cell>
            <Table.Cell>{propertyTableItem.assetName}</Table.Cell>
            <Table.Cell textAlign="right">
              {propertyTableItem.quantity}
            </Table.Cell>
            <Table.Cell textAlign="right">{propertyTableItem.price}</Table.Cell>

            <Table.Cell>{propertyTableItem.inCharge}</Table.Cell>
            <Table.Cell>{propertyTableItem.owner}</Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowLoading={shouldShowLoadingOfRestoreButton}
                isShowRestore={item.isArchived}
                title="Lưu trữ tài sản?"
                handleEvent={{
                  edit: handleEdit(item),
                  delete: handleDelete(item),
                  restore: handleRestore(item),
                }}
              />
            </Table.CellAction>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};
