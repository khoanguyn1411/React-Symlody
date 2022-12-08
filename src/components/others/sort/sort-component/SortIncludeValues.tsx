import React from "react";

import { Select } from "../../../elements";
import { TField, TValueQuery } from "../Sort";

type TProps = {
  sortSelected: TField;
  valueToQuery: TValueQuery;
  fields: TField[];
  isAscending: boolean;
  setValueToQuery: (valueToQuery: TValueQuery) => void;
  setSortSelected: (sortSelect: TField) => void;
  setIsAscending: (isAscending: boolean) => void;
};

export const SortIncludeValues: React.FC<TProps> = ({
  sortSelected,
  valueToQuery,
  fields,
  isAscending,
  setValueToQuery,
  setSortSelected,
  setIsAscending,
}) => {
  const handleRemoveSort = () => {
    setSortSelected(null);
    setValueToQuery(null);
    setIsAscending(true);
  };

  const handleSetOrdering = (ordering: string) => {
    const isAscending = sortSelected.children.find(
      (item) => item.title === ordering
    ).isAscending;
    setIsAscending(isAscending);
    setValueToQuery({ ...valueToQuery, isAscending: isAscending });
  };

  const handleSetSortSelected = (sortTitle: string) => {
    const sortItem = fields.find((item) => item.title === sortTitle);
    setSortSelected(sortItem);
    setIsAscending(true);
    setValueToQuery({
      field: sortItem.title,
      isAscending: true,
    });
  };

  const listSelect = fields
    .filter((item) => item.title !== sortSelected.title)
    .map((value) => value.title);

  return (
    <div className="p-3 w-96">
      <div className="items-center justify-between py-1 grid-cols-7 grid">
        <Select
          isPortal={false}
          className="col-span-3"
          classNameDisplay="h-8"
          list={listSelect.map((item) => ({ value: item, label: item }))}
          value={sortSelected.title}
          onChange={handleSetSortSelected}
        />
        <Select
          isPortal={false}
          className="ml-3 col-span-3"
          classNameDisplay="h-8"
          list={sortSelected.children.map((value) => ({
            value: value.title,
            label: value.title,
          }))}
          value={
            sortSelected.children.find(
              (item) => item.isAscending === isAscending
            ).title
          }
          onChange={handleSetOrdering}
        />
        <button className="col-span-1" onClick={handleRemoveSort}>
          <span className="ml-2">
            <i className="far fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};
