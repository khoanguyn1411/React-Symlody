import { Table } from "@/components";
import { IConfigInfo } from "@/features/types";

import { ItemPermission } from "./ItemPermission";

type TProps = {
  configData: IConfigInfo[];
  onOpenEdit: (data: IConfigInfo) => void;
  onDeleteRoleUser: (id: number) => void;
  isRendered: boolean;
};
export const TableGroup: React.FC<TProps> = ({
  configData,
  isRendered,
  onOpenEdit,
  onDeleteRoleUser,
}) => {
  if (!isRendered) return <Table.Skeleton colsNumber={5} />;
  if (configData == null || configData.length === 0) {
    return <Table.NoData colsNumber={5} />;
  }

  return (
    <Table.Body>
      <ItemPermission
        title="Lead"
        data={configData}
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
