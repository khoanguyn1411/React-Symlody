import { useEffect, useState } from "react";

import { ConfigApi } from "@/api";
import { Table } from "@/components";
import { IConfigManager } from "@/features/types";

export const TabRolePermission: React.FC = () => {
  const [configManager, setConfigManager] = useState<IConfigManager>(null);

  const fetchCongigManager = async () => {
    const result = await ConfigApi.getConfigManager();
    if (result.kind === "ok") {
      setConfigManager(result.result);
    } else {
      setConfigManager(null);
    }
  };
  useEffect(() => {
    fetchCongigManager();
  }, []);

  console.log(configManager, "--config");
  return (
    <>
      <Table.Container>
        <Table.Head>
          <Table.CellHead isFirst width="5rem" textAlign="center">
            Vai trò
          </Table.CellHead>
        </Table.Head>
      </Table.Container>
    </>
  );
};
