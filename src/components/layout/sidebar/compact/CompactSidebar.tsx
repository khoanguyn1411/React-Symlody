import classNames from "classnames";

import { Tooltip } from "../../../elements";

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
    <div
      id="sidebar-desktop-hover-btn"
      className={classNames(
        "absolute bottom-1/2 group-hover:opacity-100  opacity-0 invisible transition-all duration-200",
        isCompactSidebar ? "-right-4" : "-right-3"
      )}
    >
      <Tooltip content={isCompactSidebar ? "Mở rộng (b)" : "Thu gọn (b)"}>
        <span
          aria-hidden="true"
          onClick={setIsCompact}
          className={classNames(
            "flex items-center justify-center",
            " w-6 h-6 text-sm  bg-white rounded-full shadow transition-all duration-200 hover:bg-primary-400 hover:text-white cursor-pointer"
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
    </div>
  );
};
