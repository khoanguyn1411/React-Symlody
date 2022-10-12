import { useTour } from "@reactour/tour";

import { images } from "@/assets/images";
import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { LocalStorageService } from "@/utils";

import { ModalTour } from "../components";
import { ITourStepType } from "../types";
import { useBootstrapTour } from "./useBootstrapTour";

const TOUR_STEPS_SELECTOR = {
  LAYOUT_SIDEBAR: '[data-tour-id="layout__sidebar"]',
  LAYOUT_USER_DROPDOWN: '[data-tour-id="layout__userDropdown"]',
};

export const useTourLayout = () => {
  // const { user } = useAppSelector((state) => state.user);
  const tour = useTour();
  const isOpen = !LocalStorageService.getValue(
    APP_LOCAL_STORAGE_KEYS.REACT_TOUR
  );

  const handleCloseClick = () => {
    tour.setIsOpen(false);
  };

  const steps: ITourStepType[] = [
    {
      selector: "undefined",
      position: "center",

      content: function Content() {
        return (
          <ModalTour
            type="image"
            imageProps={{
              src: "",
              title:
                "Hướng dẫn sử dụng tổng quan phần mềm quản lý câu lạc bộ Symlody",
            }}
            title={"🎊 Chào mừng bạn đến với Symlody"}
            description={
              "Symlody là hệ thống quản lý các tác vụ quan trọng trong tổ chức. Hãy cùng xem qua một vài điểm nổi bật của ứng dụng"
            }
            width={600}
            onCloseClick={handleCloseClick}
          />
        );
      },
      nextTitle: "Bắt đầu",
      stepInteraction: false,
      disableActions: false,
    },
    {
      selector: TOUR_STEPS_SELECTOR.LAYOUT_SIDEBAR,

      content: function Content() {
        return (
          <ModalTour
            type="image"
            imageProps={{
              src: images.tour.sidebar,
            }}
            title={"✨ Danh mục tính năng ✨"}
            description={
              "Các tính năng chính sẽ được hiển thị trên thanh công cụ, giúp bạn dễ dàng di chuyển giữa các danh mục trong hệ thống."
            }
            onCloseClick={handleCloseClick}
          />
        );
      },
      stepInteraction: false,
      disableActions: false,
    },
    {
      selector: TOUR_STEPS_SELECTOR.LAYOUT_USER_DROPDOWN,
      padding: {
        mask: 7,
      },
      content: function Content() {
        return (
          <ModalTour
            title={"✨ Thông tin hiển thị ✨"}
            description={
              "Để tăng thêm độ nhận diện và tin cậy, hãy tiến hành thay đổi Logo cho tổ chức của bạn và ảnh đại diện của bản thân."
            }
            onCloseClick={handleCloseClick}
          />
        );
      },
      stepInteraction: false,
      disableActions: false,
    },
    {
      selector: "undefined",
      position: "center",
      content: function Content() {
        return (
          <ModalTour
            type="image"
            imageProps={{
              src: "",
              title:
                "Hướng dẫn sử dụng tổng quan phần mềm quản lý câu lạc bộ Symlody",
            }}
            title={"🎉 Chúc mừng!"}
            description={
              "Sau khi làm quen với hệ thống, bạn hãy đưa dữ liệu của tổ chức lên để bắt đầu công việc quản lý của mình."
            }
            width={480}
            onCloseClick={handleCloseClick}
          />
        );
      },
      stepInteraction: false,
      disableActions: false,
    },
  ];

  useBootstrapTour({
    isOpen: true,
    currentStep: 0,
    steps,
    onOpen: () => {
      LocalStorageService.setValue(APP_LOCAL_STORAGE_KEYS.REACT_TOUR, true);
    },
    //
  });
};
