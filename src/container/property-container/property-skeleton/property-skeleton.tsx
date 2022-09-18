type TProps = {
  length?: number;
};

import { Skeleton, Table } from "@/components";

export const TablePropertySkeleton: React.FC<TProps> = ({ length = 5 }) => {
  return (
    <Table.Body>
      {[...Array(length)].map((item, index) => (
        <Table.Row isSkeleton key={index}>
          <Table.Cell isFirst width="5rem" textAlign="center">
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell width="7rem">
            <Skeleton />
          </Table.Cell>
          <Table.Cell width="6rem">
            <Skeleton />
          </Table.Cell>
          <Table.Cell width="14rem">
            <Skeleton />
          </Table.Cell>
          <Table.Cell width="8rem">
            <Skeleton />
          </Table.Cell>
          <Table.Cell isLast width="8rem">
            <Skeleton />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
