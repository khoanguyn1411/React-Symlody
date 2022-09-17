import React, { useState } from "react";

import { DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { propertySelector } from "@/features/reducers/property-reducer";
import { IProperty } from "@/features/types";
import { FormatService } from "@/utils";

import { TablePropertySkeleton } from "../property-skeleton";

type TProps = {
  onEdit: (property: IProperty) => void;
  onDelete: (property: IProperty) => void;
};

export const TableAssetContent: React.FC<TProps> = ({ onEdit, onDelete }) => {
  const [currentDeleteId, setCurrentDeleteId] = useState<number>();
  const propertyList = useAppSelector(propertySelector.selectAll);
  const propertyStore = useAppSelector((state) => state.property);
  const propertyCount = useAppSelector(propertySelector.selectTotal);
  console.log(propertyList);
  const handleEdit = (item: IProperty) => () => {
    onEdit(item);
  };
  const handleDelete = (item: IProperty) => () => {
    onDelete(item);
    setCurrentDeleteId(item.id);
  };

  if (propertyStore.pending) {
    return <TablePropertySkeleton />;
  }

  if (propertyCount === 0) {
    return <Table.NoData colsNumber={7} />;
  }
  return (
    <Table.Body>
      {propertyList.map((item, index) => (
        <Table.Row key={item.id} index={index}>
          <Table.Cell textAlign="center" width="5rem">
            {index + 1}
          </Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell width="7rem" textAlign="right">
            {item.organization}
          </Table.Cell>
          <Table.Cell width="6rem" textAlign="right">
            {item.price
              ? `${FormatService.toCurrency(Number(item.price))}`
              : "--"}
          </Table.Cell>

          <Table.Cell width="14rem">{item.incharger.first_name}</Table.Cell>
          <Table.Cell width="11rem">{item.prop_owner}</Table.Cell>

          <Table.CellAction>
            <DeleteAndEditField
              title="Xóa tài sản?"
              handleEvent={{
                edit: handleEdit(item),
                delete: handleDelete(item),
              }}
            />
          </Table.CellAction>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
