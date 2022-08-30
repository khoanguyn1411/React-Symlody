type TProps = {
  length?: number;
};

import { Skeleton, Table } from "@/components";

export const TableAssetSkeleton: React.FC<TProps> = ({ length = 5 }) => {
  return (
    <Table.Container>
      <Table.Body>
        {[...Array(length)].map((item, index) => (
          <Table.Row isSkeleton key={index}>
            <Table.Cell isSkeleton isFirst width="5rem" textAlign="center">
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton>
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton width="7rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton width="6rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton width="14rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton width="8rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell isSkeleton isLast width="8rem">
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Container>
  );
};
