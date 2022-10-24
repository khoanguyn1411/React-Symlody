import { Avatar, DeleteAndEditField, Table, Tooltip } from "@/components";

import { IConfigData } from "./TabRolePermission";

type TProps = {
  configData: IConfigData;
};
export const TableGroup: React.FC<TProps> = ({ configData }) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>Lead</Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-start">
            {configData.dataLead.map((l) => (
              <Tooltip
                className="relative -ml-1 rounded-full ring-2 ring-white"
                key={l.id}
                content={l.first_name + " " + l.last_name}
              >
                <Avatar src="" fullName={l.first_name} />
              </Tooltip>
            ))}
          </div>
        </Table.Cell>
        <Table.CellAction>
          <DeleteAndEditField
            isShowLoading={false}
            isShowDelete={false}
            handleEvent={{
              edit: null,
            }}
          />
        </Table.CellAction>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Quản lý thành viên</Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-start">
            {configData.dataMemberManager.map((l) => (
              <Tooltip
                className="relative -ml-1 rounded-full ring-2 ring-white"
                key={l.id}
                content={l.first_name + " " + l.last_name}
              >
                <Avatar src="" fullName={l.first_name} />
              </Tooltip>
            ))}
          </div>
        </Table.Cell>
        <Table.CellAction>
          <DeleteAndEditField
            isShowLoading={false}
            isShowDelete={false}
            handleEvent={{
              edit: null,
            }}
          />
        </Table.CellAction>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Quản lý tài sản</Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-start">
            {configData.dataPropertyManager.map((l) => {
              return (
                <Tooltip
                  className="relative -ml-1 rounded-full ring-2 ring-white"
                  key={l.id}
                  content={l.first_name + " " + l.last_name}
                >
                  <Avatar src="" fullName={l.first_name} />
                </Tooltip>
              );
            })}
          </div>
        </Table.Cell>
        <Table.CellAction>
          <DeleteAndEditField
            isShowLoading={false}
            isShowDelete={false}
            handleEvent={{
              edit: null,
            }}
          />
        </Table.CellAction>
      </Table.Row>
    </Table.Body>
  );
};
