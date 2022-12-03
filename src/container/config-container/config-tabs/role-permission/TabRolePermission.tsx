import React, { Suspense, useEffect } from "react";

import { Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getConfigManager } from "@/features/reducers";
import { IConfigInfo, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";
import { lazyImport } from "@/utils/services/lazyImport";

import { TableGroup } from "./TableGroup";

const { ModalEditPermission } = lazyImport(
  () => import("./ModalEditPermission"),
  "ModalEditPermission"
);

export const TabRolePermission: React.FC = () => {
  const dispatch = useAppDispatch();
  const configManagerStore = useAppSelector((state) => state.config);

  const propsModalEditPermission = useModal<IConfigInfo>();
  useEffect(() => {
    dispatch(getConfigManager());
  }, [dispatch]);

  const handleOpenEdit = withPermission([RolesID.Lead, RolesID.SystemAdmin])(
    (data: IConfigInfo) => {
      propsModalEditPermission.setData(data);
      propsModalEditPermission.toggle.setShow();
    }
  );

  return (
    <>
      <Table.Container isFullHeight>
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

        <TableGroup
          isRendered={!configManagerStore.pendingConfigManager}
          onOpenEdit={handleOpenEdit}
        />
      </Table.Container>

      <Suspense fallback={<div>Loading...</div>}>
        <ModalEditPermission
          isShowing={propsModalEditPermission.isShowing}
          data={propsModalEditPermission.data}
          toggle={propsModalEditPermission.toggle}
        />
      </Suspense>
    </>
  );
};
