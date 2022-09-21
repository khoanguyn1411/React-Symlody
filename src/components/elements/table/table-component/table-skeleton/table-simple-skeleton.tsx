import React, { memo } from "react";

import { Skeleton, Table } from "@/components";

type TProps = {
  colsNumber: number;
  rowsNumber?: number;
};

const _TableSimpleSkeleton: React.FC<TProps> = ({
  colsNumber,
  rowsNumber = 5,
}) => {
  return (
    <Table.Body>
      {[...Array(rowsNumber)].map((item, index) => (
        <Table.Row isSkeleton key={index}>
          {[...Array(colsNumber)].map((item, index) => (
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

export const TableSimpleSkeleton = memo(_TableSimpleSkeleton);
