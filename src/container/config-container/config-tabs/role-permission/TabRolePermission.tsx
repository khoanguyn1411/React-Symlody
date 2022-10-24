import { useEffect, useState } from "react";

import { ConfigApi } from "@/api";
import { Table } from "@/components";
import { IConfigInfor } from "@/features/types";
import { useModal } from "@/hooks";

import { ModalPermission } from "./ModalPermission";
import { TableGroup } from "./TableGroup";
import { IConfigManagerForm } from "./types";

export interface IConfigData {
  dataLead: IConfigInfor[];
  dataMemberManager: IConfigInfor[];
  dataPropertyManager: IConfigInfor[];
}

export const TabRolePermission: React.FC = () => {
  const propsModalEditDepartment = useModal<IConfigManagerForm>();

  const [configData, setConfigData] = useState<IConfigData>({
    dataLead: [],
    dataMemberManager: [],
    dataPropertyManager: [],
  });

  const [isRendered, setIsRendered] = useState(false);

  const fetchCongigManager = async () => {
    const result = await ConfigApi.getConfigManager();
    if (result.kind === "ok") {
      const data = result.result;

      setConfigData({
        dataLead: data.leaders,
        dataMemberManager: data.managers.filter((data) =>
          data.groups.map((g) => g.name).includes("member_manager")
        ),
        dataPropertyManager: data.managers.filter((data) =>
          data.groups.map((g) => g.name).includes("property_manager")
        ),
      });
    } else {
      setConfigData({
        dataLead: [],
        dataMemberManager: [],
        dataPropertyManager: [],
      });
    }
    setIsRendered(true);
  };
  useEffect(() => {
    fetchCongigManager();
  }, []);

  if (!isRendered) return <div>Loading</div>;

  return (
    <>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="12rem" textAlign="left">
            Vai trò
          </Table.CellHead>
          <Table.CellHead textAlign="left">Người dùng</Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>

        <TableGroup configData={configData} />
      </Table.Container>

      <ModalPermission {...propsModalEditDepartment} />
    </>
  );
};
