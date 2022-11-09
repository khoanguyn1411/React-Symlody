import { Table } from "@/components";
import { IConfigInfo } from "@/features/types";

import { ItemPermission } from "./ItemPermission";

type TProps = {
  configData: IConfigInfo[];
  onOpenEdit: (data: IConfigInfo) => void;
  onDeleteRoleUser: (id: number) => void;
};
export const TableGroup: React.FC<TProps> = ({
  configData,
  onOpenEdit,
  onDeleteRoleUser,
}) => {
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
