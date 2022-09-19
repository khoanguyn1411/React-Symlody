type TProps = {
  length?: number;
};

import { Skeleton, Table } from "@/components";

export const TableMemberSkeleton: React.FC<TProps> = ({ length = 5 }) => {
  return (
    <Table.Body>
      {[...Array(length)].map((item, index) => (
        <Table.Row isSkeleton key={index}>
          <Table.Cell isFirst>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell isLast>
            <Skeleton />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};
