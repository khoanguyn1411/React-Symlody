import React from "react";

import { Select, TField, TValueQuery } from "@/components";

type TProps = {
  sortSelected: TField;
  valueToQuery: TValueQuery;
  fields: TField[];
  isAscending: boolean;
  setValueToQuery: React.Dispatch<React.SetStateAction<TValueQuery>>;
  setSortSelected: React.Dispatch<React.SetStateAction<TField>>;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
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
    setSortSelected(undefined);
    setValueToQuery(undefined);
    setIsAscending(true);
  };

  const handleSetOrdering = (ordering: string) => {
    const isAscending = sortSelected.children.filter(
      (item) => item.title === ordering
    )[0].isAscending;
    setIsAscending(isAscending);
    setValueToQuery({ ...valueToQuery, isAscending: isAscending });
  };

  const handleSetSortSelected = (sortTitle: string) => {
    const sortItem = fields.filter((item) => item.title === sortTitle)[0];
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
          className="col-span-3"
          classNameDisplay="h-8"
          list={listSelect}
          value={sortSelected.title}
          onChange={handleSetSortSelected}
        />
        <Select
          className="ml-3 col-span-3"
          classNameDisplay="h-8"
          list={sortSelected.children.map((value) => value.title)}
          value={
            sortSelected.children.filter(
              (item) => item.isAscending === isAscending
            )[0].title
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