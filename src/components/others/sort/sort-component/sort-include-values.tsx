import React, { useState } from "react";

import { Select, TField, TValueQuery } from "@/components";

type TProps = {
  sortItem: TField;
  sortSelected: TField[];
  valueToQuery: TValueQuery[];
  setValueToQuery: React.Dispatch<React.SetStateAction<TValueQuery[]>>;
  setSortSelected: React.Dispatch<React.SetStateAction<TField[]>>;
};

export const SortIncludeValues: React.FC<TProps> = ({
  sortItem,
  sortSelected,
  valueToQuery,
  setValueToQuery,
  setSortSelected,
}) => {
  const [ordering, setOrdering] = useState<string>(sortItem.children[0]);
  const handleRemoveSort = () => {
    setSortSelected(
      sortSelected.filter((item) => item.title !== sortItem.title)
    );
    setValueToQuery(
      valueToQuery.filter((item) => item.field !== sortItem.title)
    );
  };

  const handleSetOrdering = (ordering: string) => {
    setValueToQuery([
      ...valueToQuery.filter((value) => value.field !== sortItem.title),
      { field: sortItem.title, ordering: ordering },
    ]);
    setOrdering(ordering);
  };

  return (
    <div className="items-center justify-between py-1 grid-cols-7 grid">
      <h2 className="col-span-2">{sortItem.title}</h2>
      <Select
        className="ml-3 col-span-4"
        classNameDisplay="h-8"
        list={sortItem.children}
        value={ordering}
        onChange={handleSetOrdering}
      />
      <button className="col-span-1" onClick={handleRemoveSort}>
        <span className="ml-2">
          <i className="far fa-times"></i>
        </span>
      </button>
    </div>
  );
};
