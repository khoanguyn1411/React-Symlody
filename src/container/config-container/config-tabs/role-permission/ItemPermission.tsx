import { Avatar, DeleteAndEditField, Table, Tooltip } from "@/components";
import { IConfigInfo } from "@/features/types";

type TProps = {
  title: string;
  data: IConfigInfo[];
  onOpenEdit: (data: IConfigInfo[]) => void;
};
export const ItemPermission: React.FC<TProps> = ({
  title,
  data,
  onOpenEdit,
}) => {
  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center justify-start">
          {data.map((l) => (
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
            edit: () => onOpenEdit(data),
          }}
        />
      </Table.CellAction>
    </Table.Row>
  );
};
