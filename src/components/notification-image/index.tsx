import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { APP_DEFAULT_PAGE } from "@/routes";

import { Button } from "../elements";
type Props = {
  imgSrc?: string;
  imageHeight?: string;
  title: string;
  description?: string;
  hasButton?: boolean;
};

export const NotificationImg: React.FC<Props> = ({
  imgSrc,
  imageHeight = "512px",
  title,
  description,
  hasButton = false,
}) => {
  const navigation = useNavigate();

  const onBackToHome = () => {
    navigation(APP_DEFAULT_PAGE);
  };
  return (
    <div className="flex items-center justify-center py-4 h-content">
      <div className="flex flex-col items-center justify-center p-4 rounded-md">
        <img
          src={imgSrc || images.notFound}
          alt="not-found"
          height={imageHeight}
          width={imageHeight}
          className="object-fit"
        />

        <div className="mt-2 text-xl font-medium">
          <span>{title}</span>
        </div>

        {description && (
          <div className="mt-2 text-gray-400">
            <span>{description}</span>
          </div>
        )}

        {hasButton && (
          <div className="flex items-center mt-4 space-x-4">
            <Button onClick={onBackToHome}>Quay về trang chủ</Button>

            <Button onClick={null}>Đến trung tâm hỗ trợ</Button>
          </div>
        )}
      </div>
    </div>
  );
};
