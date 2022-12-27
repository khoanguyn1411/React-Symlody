import React, { useEffect } from "react";

import { Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getConfigManager } from "@/features/reducers";
import { RolesID, UserShort } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";

import { ModalEditPermission } from "./role-permission-modals/ModalEditPermission";
import { TabRolePermissionTable } from "./role-permission-tables/TabRolePermissionTable";

export const TabRolePermission: React.FC = () => {
  const dispatch = useAppDispatch();
  const configManagerStore = useAppSelector((state) => state.config);

  const propsModalEditPermission = useModal<UserShort>();

  const handleOpenEdit = withPermission([RolesID.Lead, RolesID.SystemAdmin])(
    (data: UserShort) => {
      propsModalEditPermission.setData(data);
      propsModalEditPermission.toggle.setShow();
    }
  );

  useEffect(() => {
    dispatch(getConfigManager());
  }, [dispatch]);

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

        <TabRolePermissionTable
          isRendered={!configManagerStore.pendingConfigManager}
          onOpenEdit={handleOpenEdit}
        />
      </Table.Container>

      <ModalEditPermission
        isShowing={propsModalEditPermission.isShowing}
        data={propsModalEditPermission.data}
        toggle={propsModalEditPermission.toggle}
      />
    </>
  );
};
