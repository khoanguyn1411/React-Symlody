import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useEffectSkipFirstRender } from "@/hooks";
import { GlobalTypes } from "@/utils";

export type TTab = {
  title: string;
  key: string;
  to?: string;
};

type TProps = {
  listTabs: TTab[];
  defaultActive?: TTab["key"];
  paramChangeDependency?: string;
  isHeaderTabHost?: boolean;
  isStretchTab?: boolean;
  tabChangeDependOnChangeOf?: TTab["key"];
  onChangeTab?: (tab: TTab) => void;
  onUrlChange?: (tab: TTab) => void;
};

export const TabHost: React.FC<TProps> = ({
  listTabs,
  onChangeTab,
  defaultActive,
  isStretchTab = false,
  tabChangeDependOnChangeOf,
  isHeaderTabHost = false,
}) => {
  const refs = useRef<HTMLButtonElement[]>([]);

  const getTabActive = useMemo(
    () => (key: TTab["key"]) => {
      return key ? listTabs.find((item) => item.key === key) : listTabs[0];
    },
    [listTabs]
  );

  const [activeTab, setActiveTab] = useState<TTab>(getTabActive(defaultActive));
  const [refState, setRefState] = useState<HTMLButtonElement[]>(refs.current);
  const [activeRef, setActiveRef] = useState<string>(activeTab.key);
  const [isAnimatedSlider, setIsAnimatedSlider] = useState<boolean>(false);
  // const navigate = useNavigate();

  const handleClickTab = (tab: TTab, title: string) => () => {
    setActiveTab(tab);
    setActiveRef(title);
    setIsAnimatedSlider(true);
    // tab.to && navigate(tab.to);
    onChangeTab && onChangeTab(tab);
  };

  if (tabChangeDependOnChangeOf) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffectSkipFirstRender(() => {
      const activeTab = getTabActive(tabChangeDependOnChangeOf);
      setActiveTab(activeTab);
      setActiveRef(activeTab.key);
      setIsAnimatedSlider(true);
    }, [getTabActive, tabChangeDependOnChangeOf]);
  }

  // useEffectSkipFirstRender(() => {
  //   if (!onUrlChange) {
  //     return;
  //   }
  //   const tabItem = listTabs.find((item) => item.key === paramChangeDependency);
  //   setActiveTab(tabItem);
  //   onUrlChange(tabItem);
  // }, [paramChangeDependency]);

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
    <div
      className={classNames("relative flex", {
        "w-full": isStretchTab,
      })}
    >
      {listTabs.map((item) => (
        <button
          ref={addToRefs}
          key={item.key}
          aria-label={item.key}
          className={classNames(
            "py-2",
            "font-medium",
            "transition-colors duration-200",
            "border-transparent rounded-sm",
            {
              "text-primary-800": item.key === activeTab.key,
              "flex-1": isStretchTab,
              "px-5 hover:bg-gray-50": !isHeaderTabHost,
              "px-3 mb-3 hover:bg-primary-50 hover:text-primary-800":
                isHeaderTabHost,
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
          isAnimatedSlider && "transition-all duration-150",
          "w-full h-[2.5px] rounded-sm flex absolute bg-primary-800 bottom-0 "
        )}
      />
    </div>
  );
};
