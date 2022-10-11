import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/features";
import { logout } from "@/features/reducers";
import { IProfile } from "@/features/types";

import { Avatar, Dropdown } from "../../elements";

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
  user: IProfile;
};
export const UserDropdown: React.FC<TProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeMenu = (item) => {
    if (item.key === "LOGOUT") {
      dispatch(logout());
      navigate("/login");
      return;
    }
  };
  return (
    <Dropdown
      placement="bottom-right"
      widthContainer="200px"
      listSetting={MENUS}
      onChange={handleChangeMenu}
    >
      <div className="flex items-center cursor-pointer space-x-2">
        <Avatar src={user?.avatar_url} fullName={user?.full_name} />
        <span className="">
          <i className="fas fa-caret-down" />
        </span>
      </div>
    </Dropdown>
  );
};
