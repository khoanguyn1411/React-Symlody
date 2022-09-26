import { images } from "@/assets/images";
import { NotificationImg } from "@/components";

export const HomeContainer: React.FC = () => {
  return (
    <NotificationImg
      imgSrc={images.loginBanner}
      title="Tính năng đang trong giai đoạn phát triểnn"
    />
  );
};
