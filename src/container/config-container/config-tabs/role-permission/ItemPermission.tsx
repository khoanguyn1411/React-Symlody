import classNames from "classnames";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { configSelectors } from "@/features/reducers";
import { ERoles, IConfigInfo } from "@/features/types";

type TProps = {
  title: string;
  onOpenEdit: (data: IConfigInfo) => void;
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

export const ItemPermission: React.FC<TProps> = ({ onOpenEdit }) => {
  const configUsersList = useAppSelector(configSelectors.selectAll);
  return (
    <>
      {configUsersList.length > 0 &&
        configUsersList.map((d) => (
          <Table.Row key={d.id}>
            <Table.Cell>
              <div className="flex items-center space-x-2">
                <Avatar src="" fullName={d.full_name} />
                <div className="flex flex-col">
                  <h2 className="font-medium">{d.full_name}</h2>
                  <span className="text-xs text-gray-400">{d.email}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={d.isRole(ERoles.Lead)} />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={d.isRole(ERoles.MemberManager)} />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={d.isRole(ERoles.PropertyManager)} />
            </Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowDelete={false}
                handleEvent={{
                  edit: () => onOpenEdit(d),
                }}
              />
            </Table.CellAction>
          </Table.Row>
        ))}
    </>
  );
};
