import React, { memo, useCallback, useMemo, useState } from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { IProperty } from "@/features/types";

import { PropertyTableMapper } from "../mapper";

type TProps = {
  onEdit: (property: IProperty) => void;
  onDelete: (property: IProperty) => void;
  onRestore: (property: IProperty) => void;
};

const _TablePropertyContent: React.FC<TProps> = ({
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
    return (index: number) =>
      (propertyStore.listQueryPropertyFE.page - 1) *
        propertyStore.listQueryPropertyFE.limit +
      index +
      1;
  }, [
    propertyStore.listQueryPropertyFE.limit,
    propertyStore.listQueryPropertyFE.page,
  ]);

  const handleEdit = useCallback(
    (item: IProperty) => () => {
      onEdit(item);
    },
    [onEdit]
  );
  const handleDelete = useCallback(
    (item: IProperty) => () => {
      onDelete(item);
      setCurrentInteractiveId(item.id);
    },
    [onDelete]
  );

  const handleRestore = useCallback(
    (item: IProperty) => () => {
      onRestore(item);
    },
    [onRestore]
  );

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
                isShowLoading={
                  (propertyStore.pendingDeleteProperty ||
                    propertyStore.pendingRestoreProperty) &&
                  currentInteractiveId === item.id
                }
                isShowRestore={item.is_archived}
                title="Xóa tài sản?"
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

export const TablePropertyContent = memo(_TablePropertyContent);
