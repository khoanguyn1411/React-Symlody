import React from "react";

import { Skeleton } from "../../../skeleton";
import { Table } from "../../table-default";

type TProps = {
  colsNumber: number;
  rowsNumber?: number;
};

export const TableSimpleSkeleton: React.FC<TProps> = ({
  colsNumber,
  rowsNumber = 5,
}) => {
  return (
    <Table.Body>
      {[...Array(rowsNumber)].map((_, index) => (
        <Table.Row isSkeleton key={index}>
          {[...Array(colsNumber)].map((_, index) => (
            <Table.Cell
              key={index}
              isFirst={index === 0}
              isLast={index === colsNumber - 1}
            >
              <Skeleton />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
};
