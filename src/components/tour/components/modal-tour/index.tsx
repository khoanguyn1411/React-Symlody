import { useTour } from "@reactour/tour";
import classNames from "classnames";
import {
  DetailedHTMLProps,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  useCallback,
} from "react";

type Props = {
  type?: "icon" | "image" | "iframe";
  icon?: JSX.Element;
  imageProps?: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  iframeCover?: string;
  iframeProps?: DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >;

  title: string;
  description: string;

  width?: number | string;
  isCloseable?: boolean;
  imageHeight?: string | number;

  onCloseClick?: () => void;
};

export const ModalTour: React.FC<Props> = ({
  type = "icon",
  icon,
  imageProps,

  title = "Title",
  description = "Description",

  width = 360,
  isCloseable = true,
  imageHeight,

  onCloseClick,
}) => {
  const { setIsOpen } = useTour();

  const handleCloseClick = useCallback(() => {
    if (onCloseClick) {
      onCloseClick();
    } else {
      setIsOpen(false);
    }
  }, [setIsOpen, onCloseClick]);

  return (
    <div className="flex flex-col" style={{ width }}>
      {isCloseable && (
        <button
          onClick={handleCloseClick}
          className={classNames(
            "absolute flex cursor-pointer top-4 right-4 text-base focus:outline-none outline-none z-10",
            {
              "text-gray-300": type === "icon",
              "text-white opacity-50": type === "image",
              "text-white opacity-60": type === "iframe",
            }
          )}
        >
          <i className="fas fa-times" />
        </button>
      )}

      {type === "image" && imageProps?.src && (
        <div>
          <img
            src={imageProps?.src}
            alt={imageProps?.title}
            className="w-full rounded-t-md"
            style={{ height: imageHeight }}
            {...imageProps}
          />
        </div>
      )}

      <div className="px-2 pt-2 space-y-1.5">
        {title && (
          <div className="flex items-center justify-center text-lg space-x-2">
            {type === "icon" && icon && <span className="flex ">{icon}</span>}
            <span className="font-medium text-primary-800">{title}</span>
          </div>
        )}

        <div className="text-center">{description}</div>
      </div>
    </div>
  );
};
