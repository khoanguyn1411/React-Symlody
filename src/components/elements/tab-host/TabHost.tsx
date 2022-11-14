import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffectSkipFirstRender } from "@/hooks";

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
  isUrlInteraction?: boolean;
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
  isUrlInteraction = false,
  isHeaderTabHost = false,
}) => {
  const refs = useRef<HTMLButtonElement[]>([]);
  const navigate = useNavigate();

  const getTabActive = useMemo(
    () => (key: TTab["key"]) => {
      return key ? listTabs.find((item) => item.key === key) : listTabs[0];
    },
    [listTabs]
  );

  const [activeTab, setActiveTab] = useState<TTab>(getTabActive(defaultActive));
  const [isAnimatedSlider, setIsAnimatedSlider] = useState<boolean>(false);

  const handleClickTab = (tab: TTab) => () => {
    setActiveTab(tab);
    setIsAnimatedSlider(true);
    tab.to && navigate(tab.to);
    onChangeTab && onChangeTab(tab);
  };

  useEffect(() => {
    if (!isUrlInteraction) {
      return;
    }
    if (tabChangeDependOnChangeOf == null) {
      navigate(listTabs[0].to);
    }
    const activeTab = getTabActive(tabChangeDependOnChangeOf);
    setActiveTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabChangeDependOnChangeOf]);

  useEffectSkipFirstRender(() => {
    setIsAnimatedSlider(true);
  }, [tabChangeDependOnChangeOf]);

  const getPositionSlider = useCallback((): {
    left: number;
    width: number;
  } => {
    if (refs.current.length === 0) {
      return;
    }
    const refOnActive = refs.current
      .map((item, index) => ({
        element: item,
        key: item.ariaLabel,
        index,
      }))
      .find((item) => item.key === activeTab.key);

    if (refOnActive.element == null) {
      return;
    }

    const rect = refOnActive.element.getBoundingClientRect();
    return {
      left: refOnActive.element.offsetLeft + window.scrollX,
      width: rect.width,
    };
  }, [activeTab, refs]);

  const [positionSlider, setPositionSlider] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const addToRefs = (element: HTMLButtonElement) => {
    if (element && !refs.current.includes(element)) {
      refs.current.push(element);
    }
  };

  useEffect(() => {
    setPositionSlider(getPositionSlider());
  }, [getPositionSlider, listTabs]);

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
              "px-5 mb-3 hover:bg-primary-50 hover:text-primary-800":
                isHeaderTabHost,
            }
          )}
          onClick={handleClickTab(item)}
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
