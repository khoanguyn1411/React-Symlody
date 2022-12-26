import { Avatar, DeleteAndEditField, Table } from "@/components";
import { useAppSelector } from "@/features";
import { configSelectors } from "@/features/reducers";
import { Roles, UserShort } from "@/features/types";

import { CheckDone } from "../role-permission-components/CheckDone";

type TProps = {
  onOpenEdit: (data: UserShort) => void;
  isRendered: boolean;
};
export const TabRolePermissionTable: React.FC<TProps> = ({
  isRendered,
  onOpenEdit,
}) => {
  const configUsersCount = useAppSelector(configSelectors.selectTotal);
  const configUsersList = useAppSelector(configSelectors.selectAll);

  if (!isRendered) {
    return <Table.Skeleton colsNumber={5} />;
  }
  if (configUsersCount === 0) {
    return <Table.NoData colsNumber={5} />;
  }

  return (
    <Table.Body>
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
    </Table.Body>
  );
};
