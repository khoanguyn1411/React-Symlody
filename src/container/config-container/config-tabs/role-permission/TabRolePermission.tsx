import _ from "lodash";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

import { ConfigApi } from "@/api";
import { Icon } from "@/assets/icons";
import { Table } from "@/components";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { IConfigInfo, IConfigManager } from "@/features/types";
import { useModal } from "@/hooks";
import { lazyImport } from "@/utils/services/lazyImport";

import { TableGroup } from "./TableGroup";

const { ModalEditPermission } = lazyImport(
  () => import("./ModalEditPermission"),
  "ModalEditPermission"
);

export const TabRolePermission: React.FC = () => {
  const userList = useAppSelector(userSelectors.selectAll);
  const userListMap: IConfigInfo[] = userList.map((u) => ({
    id: u.id,
    email: u.email,
    first_name: u.first_name,
    last_name: u.last_name,
    groups: [],
  }));

  const propsModalEditPermission = useModal<IConfigInfo>();

  const [configData, setConfigData] = useState<IConfigManager>(null);
  const [isRendered, setIsRendered] = useState(false);

  const fetchConfigManager = async () => {
    const result = await ConfigApi.getConfigManager();
    if (result.kind === "ok") {
      const data = result.result;
      console.log(_.uniqBy(userListMap.concat(data.managers), "id"));

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

        <TableGroup
          configData={configData}
          onOpenEdit={handleOpenEdit}
          onDeleteRoleUser={handleDeleteRoleUser}
        />
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
