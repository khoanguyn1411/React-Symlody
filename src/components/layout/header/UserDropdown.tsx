import { Avatar, Dropdown } from "@/components/elements";
import { IUser } from "@/features/types/dtos/user";

const MENUS = [
  {
    key: "PROFILE",
    value: "Thông tin cá nhân",
  },
  {
    key: "LOGOUT",
    value: "Đăng xuất",
  },
];

type TProps = {
  user: IUser;
};
export const UserDropdown: React.FC<TProps> = ({ user }) => {
  const handleChangeMenu = (item) => {
    if (item.key === "PROFILE") return;
  };
  return (
    <Dropdown
      placement="bottom-right"
      widthContainer="200px"
      listSetting={MENUS}
      onChange={handleChangeMenu}
    >
      <div className="flex items-center cursor-pointer space-x-2">
        <Avatar src={user.avatar_url} fullName={user.full_name} />
        <span className="">
          <i className="fas fa-caret-down" />
        </span>
      </div>
    </Dropdown>
  );
};
