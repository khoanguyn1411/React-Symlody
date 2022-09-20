import React, { memo } from "react";

import { Table } from "@/components";

type TProps = {
  colsNumber: number;
};

const _TableNoData: React.FC<TProps> = ({ colsNumber }) => {
  return (
    <Table.Body>
      <Table.Row index={0}>
        <Table.Cell colSpans={colsNumber}>
          <div className="flex items-center justify-center p-4">No data</div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

export const TableNoData = memo(_TableNoData);
