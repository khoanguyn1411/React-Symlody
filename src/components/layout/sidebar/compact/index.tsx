import { Tooltip } from "@material-tailwind/react";
import classNames from "classnames";

type Props = {
  isCompactSidebar: boolean;
  onSetIsCompact: () => void;
};

export const CompactSidebar: React.FC<Props> = ({
  isCompactSidebar,
  onSetIsCompact,
}) => {
  const setIsCompact = () => {
    onSetIsCompact && onSetIsCompact();
  };
  return (
    <Tooltip content={isCompactSidebar ? "Mở rộng (b)" : "Thu gọn (b)"}>
      <span
        aria-hidden="true"
        onClick={setIsCompact}
        className={classNames(
          "absolute  bottom-1/2",
          "flex items-center justify-center",
          " w-6 h-6 text-sm  bg-white rounded-full shadow transition-all duration-300 hover:bg-gray-50 cursor-pointer",
          isCompactSidebar ? "-right-4" : "-right-3"
        )}
      >
        <i
          className={classNames(
            "fas fa-angle-left duration-300 transition-transform text-base",
            {
              "transform -rotate-180": isCompactSidebar,
            }
          )}
        />
      </span>
    </Tooltip>
  );
};
