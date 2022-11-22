import { Table } from "@/components";
import { useAppSelector } from "@/features";
import { configSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";

import { ItemPermission } from "./ItemPermission";

type TProps = {
  onOpenEdit: (data: IConfigInfo) => void;
  isRendered: boolean;
};
export const TableGroup: React.FC<TProps> = ({ isRendered, onOpenEdit }) => {
  const configUsersCount = useAppSelector(configSelectors.selectTotal);
  if (!isRendered) {
    return <Table.Skeleton colsNumber={5} />;
  }
  if (configUsersCount === 0) {
    return <Table.NoData colsNumber={5} />;
  }

  return (
    <Table.Body>
      <ItemPermission title="Lead" onOpenEdit={onOpenEdit} />
    </Table.Body>
  );
};
