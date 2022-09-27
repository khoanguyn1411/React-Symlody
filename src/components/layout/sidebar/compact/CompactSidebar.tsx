import classNames from "classnames";
import { memo } from "react";

import { Tooltip } from "../../../elements";

type Props = {
  isCompactSidebar: boolean;
  onSetIsCompact: () => void;
};

const _CompactSidebar: React.FC<Props> = ({
  isCompactSidebar,
  onSetIsCompact,
}) => {
  const setIsCompact = () => {
    onSetIsCompact && onSetIsCompact();
  };
  return (
    <div
      className={classNames(
        "absolute  bottom-1/2",
        isCompactSidebar ? "-right-4" : "-right-3"
      )}
    >
      <Tooltip content={isCompactSidebar ? "Mở rộng (b)" : "Thu gọn (b)"}>
        <span
          aria-hidden="true"
          onClick={setIsCompact}
          className={classNames(
            "flex items-center justify-center",
            " w-6 h-6 text-sm  bg-white rounded-full shadow transition-all duration-300 hover:bg-gray-50 cursor-pointer"
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

export const CompactSidebar = memo(_CompactSidebar);
