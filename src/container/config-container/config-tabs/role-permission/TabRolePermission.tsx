import { Suspense, useEffect, useState } from "react";
import React from "react";

import { ConfigApi } from "@/api";
import { Icon } from "@/assets/icons";
import { Table } from "@/components";
import { IConfigInfo } from "@/features/types";
import { useModal } from "@/hooks";
import { lazyImport } from "@/utils/services/lazyImport";

import { TableGroup } from "./TableGroup";

const { ModalPermission } = lazyImport(
  () => import("./ModalPermission"),
  "ModalPermission"
);

export interface IConfigData {
  dataLead: IConfigInfo[];
  dataMemberManager: IConfigInfo[];
  dataPropertyManager: IConfigInfo[];
}

export const TabRolePermission: React.FC = () => {
  const propsModalEditDepartment = useModal<IConfigInfo[]>();

  const [configData, setConfigData] = useState<IConfigData>({
    dataLead: [],
    dataMemberManager: [],
    dataPropertyManager: [],
  });

  const [isRendered, setIsRendered] = useState(false);

  const fetchConfigManager = async () => {
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
    fetchConfigManager();
  }, []);

  const handleOpenEdit = (data: IConfigInfo[]) => {
    propsModalEditDepartment.setData(data);
    propsModalEditDepartment.toggle.setShow();
  };

  if (!isRendered) return <Icon.Spin size="medium" />;

  return (
    <>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="12rem" textAlign="left">
            Vai trò
          </Table.CellHead>
          <Table.CellHead textAlign="left">Thành viên</Table.CellHead>
          <Table.CellHeadAction />
        </Table.Head>

        <TableGroup configData={configData} onOpenEdit={handleOpenEdit} />
      </Table.Container>

      <Suspense fallback={<div>Loading...</div>}>
        <ModalPermission {...propsModalEditDepartment} />
      </Suspense>
    </>
  );
};
