import classNames from "classnames";
import { ReactNode, useState } from "react";

type TTab = {
  title: string;
  children: ReactNode;
  rightSide?: ReactNode;
};

type TProps = {
  renderTabs: TTab[];
};

export const TabHost: React.FC<TProps> = ({ renderTabs }) => {
  const [activeTab, setActiveTab] = useState(renderTabs[0]);
  const handleClickTab = (tab: TTab) => () => {
    setActiveTab(tab);
  };

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
      <div className="py-2 px-default">{activeTab.children}</div>
    </div>
  );
};
