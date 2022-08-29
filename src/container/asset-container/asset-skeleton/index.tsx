type TProps = {
  length?: number;
};

import { Skeleton, Table, TableBody, TableCell, TableRow } from "@/components";

export const TableAssetSkeleton: React.FC<TProps> = ({ length = 5 }) => {
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
            <TableCell isSkeleton width="7rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="6rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="14rem">
              <Skeleton />
            </TableCell>
            <TableCell isSkeleton width="8rem">
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
