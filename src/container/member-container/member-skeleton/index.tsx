type TProps = {
  length?: number;
};

import { Skeleton, Table, TableBody, TableCell, TableRow } from "@/components";

export const TableMemberSkeleton: React.FC<TProps> = ({ length = 5 }) => {
  return (
    <Table>
      <TableBody>
        {[...Array(length)].map((item, index) => (
          <TableRow isSkeleton key={index} isBorderTop={index !== 0}>
            <TableCell isSkeleton isFirst width="5rem" textAlign="center">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton>
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="6rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="8rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="18rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton isLast width="8rem">
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
