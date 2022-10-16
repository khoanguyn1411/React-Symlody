import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { EConfigTabKey } from "@/container/config-container/type";
import { useAppDispatch } from "@/features";
import { logout, setActiveTab } from "@/features/reducers";
import { IProfile } from "@/features/types";
import { EPagePath } from "@/routes";

import { Avatar, Dropdown, TItemListSelect } from "../../elements";

const MENUS: TItemListSelect[] = [
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

  const handleChangeMenu = (item: TItemListSelect) => {
    if (item.key === "LOGOUT") {
      dispatch(logout());
      navigate(EPagePath.Login);
      return;
    }
    if (item.key === "PROFILE") {
      dispatch(setActiveTab({ config: EConfigTabKey.PersonalInfo }));
      navigate(EPagePath.Config);
      return;
    }
    if (item.key === "CHANGE_PASSWORD") {
      dispatch(setActiveTab({ config: EConfigTabKey.ChangePassword }));
      navigate(EPagePath.Config);
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
      <div
        className={classNames(
          "flex items-center bg-white border shadow-sm rounded-md ",
          "py-1 pl-3 pr-2"
        )}
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
      </div>
    </Dropdown>
  );
};
