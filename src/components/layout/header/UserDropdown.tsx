import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { useAppDispatch } from "@/features";
import { logout } from "@/features/reducers";
import { IProfile } from "@/features/types";
import { EPagePath } from "@/routes";

import { Avatar, Dropdown } from "../../elements";

const MENUS = [
  {
    key: "PROFILE",
    value: "Thông tin cá nhân",
  },
  {
    key: "CHANGE_PASSWORD",
    value: "Đổi mật khẩu",
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
      navigate(EPagePath.Login);
      return;
    } else if (item.key === "PROFILE") {
      console.log("navigate to profile");
    } else if (item.key === "CHANGE_PASSWORD") {
      console.log("navigate to change password");
    }
  };
  return (
    <Dropdown
      placement="bottom-right"
      widthContainer="200px"
      listSetting={MENUS}
      onChange={handleChangeMenu}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <Avatar src={images.Logo} fullName="Logo" />
          <span className="font-medium"></span>
        </div>
        <div className="flex items-center cursor-pointer space-x-2">
          <Avatar src={user?.avatar_url} fullName={user?.full_name} />
          <span className="">
            <i className="fas fa-caret-down" />
          </span>
        </div>
      </div>
    </Dropdown>
  );
};
