import React from "react";

import { images } from "@/assets/images";

import { Table } from "../../table-default";

type TProps = {
  colsNumber: number;
};

export const TableNoData: React.FC<TProps> = ({ colsNumber }) => {
  return (
    <Table.Body>
      <Table.Row index={0}>
        <Table.Cell colSpans={colsNumber}>
          <div className="flex flex-col items-center justify-center p-4">
            <img className="w-20" src={images.noData.table} alt="no-data" />
            <span className="mt-2 text-gray-500">
              Không có dữ liệu để hiển thị
            </span>
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
