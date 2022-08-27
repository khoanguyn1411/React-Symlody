import React, { ReactNode, useState } from "react";

import { Dropdown } from "@/components/elements";
import { useEffectSkipFirstRender } from "@/hooks";

import { SortIncludeValues } from "./sort-component/sort-include-values";

type TChildrenField = {
  title: string;
  isAscending: boolean;
};

export type TField = {
  title: string;
  prefix?: ReactNode;
  children: TChildrenField[];
};

export type TValueQuery = {
  field: string;
  isAscending: boolean;
};

type TProps = {
  fields: TField[];
  defaultSortBy?: TValueQuery;
  onSortChange?: (sortValue: TValueQuery) => void;
};

export const Sort: React.FC<TProps> = ({
  fields,
  defaultSortBy,
  onSortChange,
}) => {
  const [sortSelected, setSortSelected] = useState<TField>(
    defaultSortBy
      ? fields.find((item) => item.title === defaultSortBy.field)
      : undefined
  );
  const [isAscending, setIsAscending] = useState<boolean>(
    defaultSortBy ? defaultSortBy.isAscending : true
  );

  const [valueToQuery, setValueToQuery] = useState<TValueQuery>(
    sortSelected && {
      field: sortSelected.title,
      isAscending: isAscending,
    }
  );
  const handleSetSortSelected = (sort: TField) => () => {
    setSortSelected(sort);
    setValueToQuery({
      field: sort.title,
      isAscending: isAscending,
    });
  };

  useEffectSkipFirstRender(() => {
    onSortChange && onSortChange(valueToQuery);
  }, [valueToQuery]);

  const propsOfSortIncludeValues = {
    defaultSortBy,
    valueToQuery,
    sortSelected,
    fields,
    isAscending,
    setValueToQuery,
    setSortSelected,
    setIsAscending,
  };

  return (
    <Dropdown
      widthContainer="auto"
      isOverflow={false}
      placement="bottom-right"
      renderCustom={
        <div>
          <h1 className="w-full p-3 font-semibold border-b border-gray-200">
            Sắp xếp theo
          </h1>
          {!sortSelected && (
            <div className="w-60">
              {fields.map((item, index) => (
                <button
                  className="flex items-center w-full px-3 py-2 font-semibold cursor-pointer duration-200 hover:bg-primary-50"
                  key={index}
                  onClick={handleSetSortSelected(item)}
                >
                  <span className="w-6 mr-2 text-center">{item.prefix}</span>
                  <h1>{item.title}</h1>
                </button>
              ))}
            </div>
          )}
          {sortSelected && <SortIncludeValues {...propsOfSortIncludeValues} />}
        </div>
      }
    >
      <span className="font-semibold">
        <i className="mr-2 fas fa-sort"></i>
        Sắp xếp
      </span>
    </Dropdown>
  );
};
