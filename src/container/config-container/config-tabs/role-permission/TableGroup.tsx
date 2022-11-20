import { Table } from "@/components";
import { useAppSelector } from "@/features";
import { configSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";

import { ItemPermission } from "./ItemPermission";

type TProps = {
  onOpenEdit: (data: IConfigInfo) => void;
  onDeleteRoleUser: (id: number) => void;
  isRendered: boolean;
};
export const TableGroup: React.FC<TProps> = ({
  isRendered,
  onOpenEdit,
  onDeleteRoleUser,
}) => {
  const configUsersCount = useAppSelector(configSelectors.selectTotal);
  if (!isRendered) {
    return <Table.Skeleton colsNumber={5} />;
  }
  if (configUsersCount === 0) {
    return <Table.NoData colsNumber={5} />;
  }

  return (
    <Table.Body>
      <ItemPermission
        title="Lead"
        onOpenEdit={onOpenEdit}
        onDeleteRoleUser={onDeleteRoleUser}
      />

      {/* <ItemPermission
        title="Quản lý"
        data={configData.managers}
        onOpenEdit={onOpenEdit}
        onDeleteRoleUser={onDeleteRoleUser}
      /> */}
    </Table.Body>
  );
};
