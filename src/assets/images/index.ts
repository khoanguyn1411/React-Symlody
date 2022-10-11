import notFound from "./call-to-action/not-found.png";
import comingSoon from "./comming-soon/bulb.png";
import loginBanner from "./img-login/LoginBanner.png";
import loginTopRightCorner from "./img-login/LoginTopRightCorner.png";
import Logo from "./logo/Logo.png";
import noDataAsset from "./no-data/NoDataAsset.png";
import noDataEvent from "./no-data/NoDataEvent.png";
import noDataMember from "./no-data/NoDataMember.png";
import NoDataTable from "./no-data/NoDataTable.png";
import noDataTarget from "./no-data/NoDataTarget.png";
import NoDataTodos from "./no-data/NoDataTodos.png";
import Congratulation from "./tour/congratulation.png";
import Sidebar from "./tour/sidebar.png";
import Welcome from "./tour/welcome.png";

export const images = {
  loginBanner,
  loginTopRightCorner,
  notFound,
  noData: {
    asset: noDataAsset,
    member: noDataMember,
    event: noDataEvent,
    target: noDataTarget,
    todo: NoDataTodos,
    table: NoDataTable,
  },
  Logo,
  comingSoon,
  tour: {
    sidebar: Sidebar,
    congratulation: Congratulation,
    welcome: Welcome,
  },
};
