import classNames from "classnames";
import { useState } from "react";
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
  isRounded?: boolean;
  isNoSpace?: boolean;
  isStretchTab?: boolean;
  onChangeTab?: (tab: TTab) => void;
  onUrlChange?: (tab: TTab) => void;
};

export const TabHost: React.FC<TProps> = ({
  listTabs,
  onChangeTab,
  paramChangeDependency,
  defaultActive,
  onUrlChange,
  isStretchTab = false,
  isRounded = false,
  isNoSpace = false,
}) => {
  const [activeTab, setActiveTab] = useState<TTab>(
    defaultActive
      ? listTabs.filter((item) => item.key === defaultActive)[0]
      : listTabs[0]
  );
  const navigate = useNavigate();

  const handleClickTab = (tab: TTab) => () => {
    setActiveTab(tab);
    tab.to && navigate(tab.to);
    onChangeTab && onChangeTab(tab);
  };

  useEffectSkipFirstRender(() => {
    if (!onUrlChange) {
      return;
    }
    const tabItem = listTabs.filter(
      (item) => item.key === paramChangeDependency
    )[0];
    setActiveTab(tabItem);
    onUrlChange(tabItem);
  }, [paramChangeDependency]);

  return (
    <div className={classNames(!isNoSpace && "space-x-2", "flex w-full")}>
      {listTabs.map((item, index) => (
        <button
          className={classNames(
            "px-5 py-2",
            "font-medium",
            "transition-colors duration-200",
            {
              "bg-primary-50 text-primary-800": item.key === activeTab.key,
              "hover:bg-gray-50": item.key !== activeTab.key,
              "rounded-md": isRounded,
              "flex-1": isStretchTab,
            }
          )}
          key={index}
          onClick={handleClickTab(item)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};