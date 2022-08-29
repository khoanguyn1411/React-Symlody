import {
  TableBody,
  TableCell,
  TableCellAction,
  TableCellHead,
  TableCellHeadAction,
  TableContainer,
  TableHead,
  TableRow,
} from "../table-component";

export const Table = {
  Container: TableContainer,
  CellHead: TableCellHead,
  Cell: TableCell,
  Body: TableBody,
  CellAction: TableCellAction,
  CellHeadAction: TableCellHeadAction,
  Head: TableHead,
  Row: TableRow,
} as const;
