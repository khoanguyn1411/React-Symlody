import { Table } from "@/components";
import { IConfigInfo } from "@/features/types";

import { ItemPermission } from "./ItemPermission";
import { IConfigData } from "./TabRolePermission";

type TProps = {
  configData: IConfigData;
  onOpenEdit: (data: IConfigInfo[]) => void;
};
export const TableGroup: React.FC<TProps> = ({ configData, onOpenEdit }) => {
  return (
    <Table.Body>
      <ItemPermission
        title="Lead"
        data={configData.dataLead}
        onOpenEdit={onOpenEdit}
      />

      <ItemPermission
        title="Quản lý thành viên"
        data={configData.dataMemberManager}
        onOpenEdit={onOpenEdit}
      />

      <ItemPermission
        title="Quản lý tài sản"
        data={configData.dataPropertyManager}
        onOpenEdit={onOpenEdit}
      />
    </Table.Body>
  );
};
