import { Suspense, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

import { ConfigApi } from "@/api";
import { Icon } from "@/assets/icons";
import { Table } from "@/components";
import { GROUPS } from "@/constants";
import { useAppSelector } from "@/features";
import { userSelectors } from "@/features/reducers";
import { IConfigInfo } from "@/features/types";
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

  const [configData, setConfigData] = useState<IConfigInfo[]>([]);
  const [isRendered, setIsRendered] = useState(false);

  const fetchConfigManager = async () => {
    const result = await ConfigApi.getConfigManager();
    if (result.kind === "ok") {
      const res = result.result.leaders.concat(result.result.managers);
      const data = userListMap.map((u) => {
        const _user = res.find((r) => r.id === u.id);
        if (_user) {
          return { ..._user };
        }
        return { ...u };
      });

      setConfigData(data);
    } else {
      setConfigData([]);
    }
    setIsRendered(true);
  };

  useEffect(() => {
    fetchConfigManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUpdateRoleUser = async (userId: number, groups: number[]) => {
    const result = await ConfigApi.updateConfigRoleUser({
      user_id: userId,
      groups,
    });

    if (result.kind !== "ok") {
      toast.error("Phân quyền không thành công");
      return false;
    }
    toast.success("Phân quyền thành công");

    const newUserIdx = configData.findIndex((d) => d.id === userId);
    const newUser = configData.find((d) => d.id === userId);

    const _newList = configData;
    const _groups = GROUPS.filter((g) => groups.includes(g.id));

    if (newUserIdx > -1) {
      _newList[newUserIdx] = { ...newUser, groups: _groups };
      setConfigData(_newList);
    }
    return true;
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
            onUpdateUserRole={handleUpdateRoleUser}
          />
        )}
      </Suspense>
    </>
  );
};
