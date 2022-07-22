import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
type Props = {
  imageHeight?: string;
  title: string;
  description?: string;
};

export const NotFound: React.FC<Props> = ({
  imageHeight = "512px",
  title,
  description,
}) => {
  const navigation = useNavigate();

  const onBackToHome = () => {
    navigation("/");
  };
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-md">
        <img
          src={images.imageNotFound}
          alt="not-found"
          height={imageHeight}
          width={imageHeight}
          className="object-fit"
        />

        <div className="mt-2 text-lg font-medium">
          <span>{title || "Title"}</span>
        </div>

        {description && (
          <div className="mt-2 text-gray-400">
            <span>{description}</span>
          </div>
        )}

        <div className="flex items-center mt-4 space-x-4">
          <Button onClick={onBackToHome}>Quay về trang chủ</Button>

          <Button
            className="text-gray-400 border border-gray-400"
            onClick={null}
            variant="outlined"
          >
            Đến trung tâm hỗ trợ
          </Button>
        </div>
      </div>
    </div>
  );
};
