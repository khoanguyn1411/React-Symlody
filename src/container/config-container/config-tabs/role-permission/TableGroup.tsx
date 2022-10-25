import { Table } from "@/components";
import { IConfigInfo, IConfigManager } from "@/features/types";

import { ItemPermission } from "./ItemPermission";

type TProps = {
  configData: IConfigManager;
  onOpenEdit: (data: IConfigInfo) => void;
};
export const TableGroup: React.FC<TProps> = ({ configData, onOpenEdit }) => {
  return (
    <Table.Body>
      <ItemPermission
        title="Lead"
        data={configData.leaders}
        onOpenEdit={onOpenEdit}
      />

      <ItemPermission
        title="Quản lý"
        data={configData.managers}
        onOpenEdit={onOpenEdit}
      />
    </Table.Body>
  );
};
