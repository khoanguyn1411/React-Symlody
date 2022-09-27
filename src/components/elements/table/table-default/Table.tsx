import {
  TableBody,
  TableCell,
  TableCellAction,
  TableCellHead,
  TableCellHeadAction,
  TableContainer,
  TableHead,
  TableNoData,
  TableRow,
} from "../table-component";
import { TableSimpleSkeleton } from "../table-component/table-skeleton";

export const Table = {
  Container: TableContainer,
  CellHead: TableCellHead,
  Cell: TableCell,
  Body: TableBody,
  CellAction: TableCellAction,
  CellHeadAction: TableCellHeadAction,
  Head: TableHead,
  Row: TableRow,
  NoData: TableNoData,
  Skeleton: TableSimpleSkeleton,
} as const;
