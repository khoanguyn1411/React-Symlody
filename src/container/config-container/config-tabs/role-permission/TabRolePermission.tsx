import { Suspense, useEffect, useState } from "react";
import React from "react";

import { ConfigApi } from "@/api";
import { Icon } from "@/assets/icons";
import { Table } from "@/components";
import { IConfigInfo, IConfigManager } from "@/features/types";
import { useModal } from "@/hooks";
import { lazyImport } from "@/utils/services/lazyImport";

import { TableGroup } from "./TableGroup";

const { ModalEditPermission } = lazyImport(
  () => import("./ModalEditPermission"),
  "ModalEditPermission"
);

export interface IConfigData {
  dataLead: IConfigInfo[];
  dataMemberManager: IConfigInfo[];
  dataPropertyManager: IConfigInfo[];
}

export const TabRolePermission: React.FC = () => {
  const propsModalEditPermission = useModal<IConfigInfo>();

  const [configData, setConfigData] = useState<IConfigManager>(null);
  const [isRendered, setIsRendered] = useState(false);

  const fetchConfigManager = async () => {
    const result = await ConfigApi.getConfigManager();
    if (result.kind === "ok") {
      const data = result.result;

      setConfigData(data);
    } else {
      setConfigData(null);
    }
    setIsRendered(true);
  };

  useEffect(() => {
    fetchConfigManager();
  }, []);

  const handleOpenEdit = (data: IConfigInfo) => {
    propsModalEditPermission.setData(data);
    propsModalEditPermission.toggle.setShow();
  };

  if (!isRendered) return <Icon.Spin size="medium" />;

  return (
    <>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst textAlign="left">
            Thành viên
          </Table.CellHead>
          <Table.CellHead width="4rem" textAlign="left">
            Lead
          </Table.CellHead>
          <Table.CellHead width="4rem" textAlign="left">
            Quản lý thành viên
          </Table.CellHead>
          <Table.CellHead width="4rem" textAlign="left">
            Quản lý tài sản
          </Table.CellHead>

          <Table.CellHeadAction />
        </Table.Head>

        <TableGroup configData={configData} onOpenEdit={handleOpenEdit} />
      </Table.Container>

      <Suspense fallback={<div>Loading...</div>}>
        {propsModalEditPermission.isShowing && (
          <ModalEditPermission
            isShowing={propsModalEditPermission.isShowing}
            data={propsModalEditPermission.data}
            toggle={propsModalEditPermission.toggle}
            configData={configData}
          />
        )}
      </Suspense>
    </>
  );
};
