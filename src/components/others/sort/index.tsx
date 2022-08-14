import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { Dropdown } from "@/components";
import { DropdownGeneral } from "@/components/elements/dropdown/dropdown-components";

import { SortIncludeValues } from "./sort-component/sort-include-values";

export type TField = {
  title: string;
  prefix?: ReactNode;
  children: string[];
};

export type TValueQuery = {
  field: string;
  ordering: string;
};

type TProps = {
  fields: TField[];
  onSortChange?: (sortValue: TValueQuery[]) => void;
};

export const Sort: React.FC<TProps> = ({ fields, onSortChange }) => {
  const [isShowContent, setIsShowContent] = useState(false);
  const [sortSelected, setSortSelected] = useState<TField[]>([]);
  const [valueToQuery, setValueToQuery] = useState<TValueQuery[]>([]);

  // const listAdd = useMemo(() => {
  //   return fields
  //     .filter((item) => !sortSelected.includes(item))
  //     .map((value) => value.title);
  // }, [fields, sortSelected]);

  const handleSetSortSelected = (sort: TField) => () => {
    setSortSelected([...sortSelected, sort]);
    setValueToQuery([
      ...valueToQuery.filter((value) => value.field !== sort.title),
      { field: sort.title, ordering: sort.children[0] },
    ]);
  };

  // const handleSetOtherSort = (sortTitle: string) => {
  //   const sortItem = fields.filter((item) => item.title === sortTitle)[0];
  //   setSortSelected([...sortSelected, sortItem]);
  //   setValueToQuery([
  //     ...valueToQuery.filter((value) => value.field !== sortTitle),
  //     { field: sortTitle, ordering: sortItem.children[0] },
  //   ]);
  // };

  useEffect(() => {
    onSortChange && onSortChange(valueToQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueToQuery]);

  return (
    <DropdownGeneral
      display={
        <span>
          <i className="mr-2 fas fa-sort"></i>
          Sắp xếp
        </span>
      }
      isShowContent={isShowContent}
      setIsShowContent={setIsShowContent}
    >
      <div>
        <h1 className="w-full p-3 font-semibold border-b border-gray-200">
          Sắp xếp theo
        </h1>
        {sortSelected.length === 0 && (
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
        {sortSelected.length > 0 && (
          <>
            <div className="p-3 w-80">
              {sortSelected.map((item, index) => (
                <SortIncludeValues
                  valueToQuery={valueToQuery}
                  setValueToQuery={setValueToQuery}
                  sortSelected={sortSelected}
                  setSortSelected={setSortSelected}
                  key={index}
                  sortItem={item}
                />
              ))}
            </div>
            {/* <div className="px-3 pb-3">
              {sortSelected.length !== fields.length && (
                <Dropdown
                  listSetting={{
                    list: listAdd,
                  }}
                  onChange={handleSetOtherSort}
                >
                  <span>
                    <i className="mr-3 far fa-plus"></i> Thêm tùy chọn sắp xếp
                  </span>
                </Dropdown>
              )}
            </div> */}
          </>
        )}
      </div>
    </DropdownGeneral>
  );
};
