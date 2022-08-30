type TProps = {
  length?: number;
};

import { Skeleton, Table } from "@/components";

export const TableMemberSkeleton: React.FC<TProps> = ({ length = 5 }) => {
  return (
    <Table.Container>
      <Table.Body>
        {[...Array(length)].map((item, index) => (
          <Table.Row isSkeleton key={index}>
            <Table.Cell index={index} isSkeleton isFirst width="5rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell index={index} isSkeleton>
              <Skeleton />
            </Table.Cell>
            <Table.Cell index={index} isSkeleton width="6rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell index={index} isSkeleton width="8rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell index={index} isSkeleton width="18rem">
              <Skeleton />
            </Table.Cell>
            <Table.Cell index={index} isSkeleton isLast width="8rem">
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Container>
  );
};
