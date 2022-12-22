import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { useAppDispatch } from "@/features";
import { logoutAsync } from "@/features/reducers";
import { Organization, Profile } from "@/features/types";
import { routePaths } from "@/routes";

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
  user: Profile;
  organization: Organization;
};
export const UserDropdown: React.FC<TProps> = ({ user, organization }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeMenu = (item: TItemListSelect) => {
    if (item.key === "LOGOUT") {
      dispatch(logoutAsync());
      return;
    }
    if (item.key === "PROFILE") {
      navigate(routePaths.config.children.personalInfo.url);
      return;
    }
    if (item.key === "CHANGE_PASSWORD") {
      navigate(routePaths.config.children.changePassword.url);
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
            <Avatar
              src={organization?.logo || images.Logo}
              fullName={organization?.name}
            />
            <span className="font-medium">
              {organization?.abbreviationName || organization?.name}
            </span>
          </div>
          <div className="flex items-center cursor-pointer space-x-2">
            <Avatar src={user?.avatarUrl} fullName={user?.lastName} />
            <span className="">
              <i className="fas fa-caret-down" />
            </span>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
