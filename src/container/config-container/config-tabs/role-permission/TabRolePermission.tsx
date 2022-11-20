import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ConfigApi } from "@/api";
import { Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getConfigManager,
  getUsersAsync,
  userSelectors,
} from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
import { withPermission } from "@/hoc";
import { useModal } from "@/hooks";
import { lazyImport } from "@/utils/services/lazyImport";

import { TableGroup } from "./TableGroup";

const { ModalEditPermission } = lazyImport(
  () => import("./ModalEditPermission"),
  "ModalEditPermission"
);

export const TabRolePermission: React.FC = () => {
  const userCount = useAppSelector(userSelectors.selectTotal);
  const propsModalEditPermission = useModal<IConfigInfo>();
  const dispatch = useAppDispatch();
  const [isRendered, setIsRendered] = useState(false);

  const fetchConfigManager = async () => {
    const hasUser = userCount > 0;
    const combinedPromise = hasUser
      ? Promise.all([dispatch(getConfigManager())])
      : Promise.all([dispatch(getConfigManager()), dispatch(getUsersAsync())]);
    combinedPromise.then(() => setIsRendered(true));
  };

  useEffect(() => {
    fetchConfigManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenEdit = withPermission([1, 2])((data: IConfigInfo) => {
    propsModalEditPermission.setData(data);
    propsModalEditPermission.toggle.setShow();
  });

  const handleDeleteRoleUser = async (userId: number) => {
    if (userId) {
      const result = await ConfigApi.updateConfigRoleUser({
        user_id: userId,
        groups: [],
      });
      if (result.kind !== "ok") {
        toast.error("Xoá quyền người dùng không thành công");
        return;
      }
      toast.success("Xoá quyền người dùng thành công");
    }
  };

  const handleUpdateRoleUser = async (userId: number, groups: number[]) => {
    return false;
  };

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
          isRendered={isRendered}
          onOpenEdit={handleOpenEdit}
          onDeleteRoleUser={handleDeleteRoleUser}
        />
      </Table.Container>

      <Suspense fallback={<div>Loading...</div>}>
        <ModalEditPermission
          isShowing={propsModalEditPermission.isShowing}
          data={propsModalEditPermission.data}
          toggle={propsModalEditPermission.toggle}
          onUpdateUserRole={handleUpdateRoleUser}
        />
      </Suspense>
    </>
  );
};
