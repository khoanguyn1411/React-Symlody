import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { EConfigTabKey } from "@/container/config-container/type";
import { useAppDispatch } from "@/features";
import { logout } from "@/features/reducers";
import { IProfile, ITenant } from "@/features/types";
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

const getTabUrl = (url: string): string => {
  const BASE_URL = EPagePath.Config;
  return `${BASE_URL}/${url}`;
};

type TProps = {
  user: IProfile;
  tenant: ITenant;
};
export const UserDropdown: React.FC<TProps> = ({ user, tenant }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeMenu = (item: TItemListSelect) => {
    if (item.key === "LOGOUT") {
      dispatch(logout());
      navigate(getTabUrl(EPagePath.Login));
      return;
    }
    if (item.key === "PROFILE") {
      navigate(getTabUrl(EConfigTabKey.PersonalInfo));
      return;
    }
    if (item.key === "CHANGE_PASSWORD") {
      navigate(getTabUrl(EConfigTabKey.ChangePassword));
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
            <Avatar src={tenant?.logo || images.Logo} fullName={tenant?.name} />
            <span className="font-medium">
              {tenant?.abbreviation_name || tenant?.name}
            </span>
          </div>
          <div className="flex items-center cursor-pointer space-x-2">
            <Avatar src={user?.avatar} fullName={user?.last_name} />
            <span className="">
              <i className="fas fa-caret-down" />
            </span>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
