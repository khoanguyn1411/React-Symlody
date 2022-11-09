import classNames from "classnames";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { IConfigInfo } from "@/features/types";

type TProps = {
  title: string;
  data: IConfigInfo[];
  onOpenEdit: (data: IConfigInfo) => void;
  onDeleteRoleUser: (id: number) => void;
};

interface TCheckDone {
  isActive: boolean;
}
const CheckDone: React.FC<TCheckDone> = ({ isActive }) => {
  return (
    <span>
      <i
        className={classNames(
          "fas fa-check-circle",
          isActive ? "text-green-400" : "text-gray-400"
        )}
      />
    </span>
  );
};

export const ItemPermission: React.FC<TProps> = ({ data, onOpenEdit }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((d) => (
          <Table.Row key={d.id}>
            <Table.Cell>
              <div className="flex items-center space-x-2">
                <Avatar src="" fullName={d.first_name + " " + d.last_name} />
                <div className="flex flex-col">
                  <h2 className="font-medium">
                    {d.first_name + " " + d.last_name}
                  </h2>
                  <span className="text-xs text-gray-400">{d.email}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone
                isActive={d.groups.map((g) => g.name).includes("lead")}
              />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone
                isActive={d.groups
                  .map((g) => g.name)
                  .includes("member_manager")}
              />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone
                isActive={d.groups
                  .map((g) => g.name)
                  .includes("property_manager")}
              />
            </Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowLoading={false}
                title="Bạn có chắc muốn xoá quyền thành viên này?"
                titleDelete="Xoá"
                isShowDelete={false}
                handleEvent={{
                  edit: () => onOpenEdit(d),
                  // delete: () => onDeleteRoleUser(d.id),
                }}
              />
            </Table.CellAction>
          </Table.Row>
        ))}
    </>
  );
};
