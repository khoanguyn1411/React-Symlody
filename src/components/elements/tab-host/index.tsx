import classNames from "classnames";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEffectSkipFirstRender } from "@/hooks";

type TTab = {
  title: string;
  children: ReactNode;
  rightSide?: ReactNode;
  to?: string;
};

type TProps = {
  renderTabs: TTab[];
  tabUrlChange?: string;
};

export const TabHost: React.FC<TProps> = ({ renderTabs, tabUrlChange }) => {
  const getTabActive = () => {
    if (!tabUrlChange) {
      return renderTabs[0];
    }
    return renderTabs.filter((item) => {
      const arr = item.to.split("/");
      const lastParam = arr[arr.length - 1];
      return lastParam === tabUrlChange;
    })[0];
  };

  const [activeTab, setActiveTab] = useState<TTab>(getTabActive());

  const navigate = useNavigate();
  const handleClickTab = (tab: TTab) => () => {
    setActiveTab(tab);
    if (tab.to) {
      navigate(tab.to);
    }
  };

  useEffectSkipFirstRender(() => {
    setActiveTab(getTabActive());
  }, [tabUrlChange]);

  return (
    <div>
      <div className="flex justify-between w-full py-3 bg-white border-b px-default">
        <div className="flex gap-2">
          {renderTabs.map((item, index) => (
            <button
              className={classNames(
                "px-5 py-2 rounded-md transition-colors duration-200 font-medium",
                {
                  "bg-primary-50 text-primary-800":
                    item.title === activeTab.title,
                  "hover:bg-gray-50": item.title !== activeTab.title,
                }
              )}
              key={index}
              onClick={handleClickTab(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div>{activeTab.rightSide}</div>
      </div>
      <div className="p-default">{activeTab.children}</div>
    </div>
  );
};
