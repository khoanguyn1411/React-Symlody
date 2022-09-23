import classNames from "classnames";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { GlobalTypes } from "@/types";

export type TTab = {
  title: string;
  key: string;
  to?: string;
};

type TProps = {
  listTabs: TTab[];
  defaultActive?: TTab["key"];
  paramChangeDependency?: string;
  isNoSpace?: boolean;
  isStretchTab?: boolean;
  onChangeTab?: (tab: TTab) => void;
  onUrlChange?: (tab: TTab) => void;
};

const _TabHost: React.FC<TProps> = ({
  listTabs,
  onChangeTab,
  defaultActive,
  isStretchTab = false,
  isNoSpace = false,
}) => {
  const [activeTab, setActiveTab] = useState<TTab>(
    defaultActive
      ? listTabs.find((item) => item.key === defaultActive)
      : listTabs[0]
  );
  // const navigate = useNavigate();

  const handleClickTab = (tab: TTab, title: string) => () => {
    setActiveTab(tab);
    setActiveRef(title);
    // tab.to && navigate(tab.to);
    onChangeTab && onChangeTab(tab);
  };

  // useEffectSkipFirstRender(() => {
  //   if (!onUrlChange) {
  //     return;
  //   }
  //   const tabItem = listTabs.find((item) => item.key === paramChangeDependency);
  //   setActiveTab(tabItem);
  //   onUrlChange(tabItem);
  // }, [paramChangeDependency]);

  const refs = useRef<HTMLButtonElement[]>([]);
  const [refState, setRefState] = useState<HTMLButtonElement[]>(refs.current);
  const [activeRef, setActiveRef] = useState<string>(activeTab.key);

  const getPositionSlider = useCallback((): GlobalTypes.StrictPick<
    React.CSSProperties,
    "left" | "width"
  > => {
    if (refState.length === 0) {
      return;
    }
    const refIndex = refState
      .map((item, index) => ({
        element: item,
        key: item.ariaLabel,
        index,
      }))
      .find((item) => item.key === activeRef);

    if (refIndex.element == null) {
      return;
    }

    return {
      left: refIndex.element.offsetLeft,
      width: refIndex.element.offsetWidth,
    };
  }, [activeRef, refState]);

  const [positionSlider, setPositionSlider] = useState(() =>
    getPositionSlider()
  );

  const addToRefs = (element: HTMLButtonElement) => {
    if (element && !refs.current.includes(element)) {
      refs.current.push(element);
    }
  };

  useEffect(() => {
    setRefState(refs.current);
  }, [refs]);

  useEffect(() => {
    setPositionSlider(getPositionSlider());
  }, [getPositionSlider, refState]);

  return (
    <div className={classNames(!isNoSpace && "space-x-2", "flex w-full")}>
      <div className="relative flex w-full">
        {listTabs.map((item) => (
          <button
            ref={addToRefs}
            key={item.key}
            aria-label={item.key}
            className={classNames(
              "px-5 py-2",
              "font-medium",
              "transition-colors duration-200",
              {
                "hover:bg-gray-50 border-transparent":
                  item.key !== activeTab.key,
                "flex-1": isStretchTab,
              }
            )}
            onClick={handleClickTab(item, item.key)}
          >
            {item.title}
          </button>
        ))}
        <div
          style={positionSlider}
          className={classNames(
            "w-full h-[2.5px] rounded-sm flex absolute bg-primary-800 transition-all bottom-0 duration-150"
          )}
        />
      </div>
    </div>
  );
};

export const TabHost = memo(_TabHost);
