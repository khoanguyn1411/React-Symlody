import classNames from "classnames";

import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { configSelectors } from "@/features/reducers";
import { Roles, UserShort } from "@/features/types";

type TProps = {
  title: string;
  onOpenEdit: (data: UserShort) => void;
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
        configUsersList.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <div className="flex items-center space-x-2">
                <Avatar src={user.avatarUrl} fullName={user.fullName} />
                <div className="flex flex-col">
                  <h2 className="font-medium">{user.fullName}</h2>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={user.isRole([Roles.Lead])} />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={user.isRole([Roles.MemberManager])} />
            </Table.Cell>
            <Table.Cell width="4rem" textAlign="center">
              <CheckDone isActive={user.isRole([Roles.PropertyManager])} />
            </Table.Cell>

            <Table.CellAction>
              <DeleteAndEditField
                isShowDelete={false}
                handleEvent={{
                  edit: () => onOpenEdit(user),
                }}
              />
            </Table.CellAction>
          </Table.Row>
        ))}
    </>
  );
};
