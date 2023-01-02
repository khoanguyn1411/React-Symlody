import React, { useMemo, useState } from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { Property } from "@/features/types";

import { propertyTableMapper } from "../mapper";

const TABLE_COLUMNS_NUMBER = 7;

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
    const { page, limit } = propertyStore.filterParamsProperty;
    return (index: number) => (page - 1) * limit + index + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    propertyStore.filterParamsProperty.limit,
    propertyStore.filterParamsProperty.page,
  ]);

  const handleEdit = (item: Property) => () => {
    onEdit(item);
  };
  const handleDelete = (item: Property) => () => {
    setCurrentInteractiveId(item.id);
    onDelete(item);
  };
  const handleRestore = (item: Property) => () => {
    setCurrentInteractiveId(item.id);
    onRestore(item);
  };

  if (propertyStore.pending) {
    return <Table.Skeleton colsNumber={TABLE_COLUMNS_NUMBER} />;
  }

  if (propertyCount === 0) {
    return <Table.NoData colsNumber={TABLE_COLUMNS_NUMBER} />;
  }
  return (
    <Table.Body>
      {propertyStore.propertyListPagination.map((item, index) => {
        const propertyTableItem = propertyTableMapper.fromModel(item);
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
