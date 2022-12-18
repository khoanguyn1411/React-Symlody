import React, { useState } from "react";

import { useEffectSkipFirstRender } from "@/hooks";
import { AppReact } from "@/utils/types";

import { Checkbox } from "./Checkbox";

type TCheckboxGroupListItem = {
  label: string;
  value: string;
};

type TProps = {
  list?: TCheckboxGroupListItem[];
  isOnlyOne?: boolean;
  selectedItems: TCheckboxGroupListItem[] | boolean;
  setSelectedItems: AppReact.State.Dispatch<TCheckboxGroupListItem[] | boolean>;
};

export const CheckboxGroup: React.FC<TProps> = ({
  list,
  selectedItems,
  isOnlyOne = false,
  setSelectedItems,
}) => {
  const [_selectedItems, _setSelectedItems] =
    useState<typeof selectedItems>(selectedItems);

  if (isOnlyOne && list.length > 1) {
    throw new Error(
      "CheckboxGroup error:  `onlyOne` prop only can execute when the list has only 1 item"
    );
  }

  const handleSetSelectedItem = (item: TCheckboxGroupListItem) => () => {
    if (isOnlyOne) {
      _setSelectedItems((prev) => !prev);
      return;
    }

    _setSelectedItems((prev: TCheckboxGroupListItem[]) => {
      const isItemInSelectedList =
        prev.find((selectedItem) => selectedItem.value === item.value) == null;
      if (isItemInSelectedList) {
        return [...prev, item];
      }
      return prev.filter((selectedItem) => selectedItem.value !== item.value);
    });
  };

  useEffectSkipFirstRender(() => {
    setSelectedItems(_selectedItems);
  }, [_selectedItems, setSelectedItems]);
  return (
    <>
      {list.map((item) => (
        <button
          aria-selected
          role="option"
          type="button"
          className="flex items-center -ml-2 gap-1"
          onClick={handleSetSelectedItem(item)}
          key={item.value}
        >
          <Checkbox
            checked={
              isOnlyOne
                ? (_selectedItems as boolean)
                : (_selectedItems as TCheckboxGroupListItem[]).find(
                    (selectedItem) => selectedItem.value === item.value
                  ) != null
            }
          />
          <span>{item.label}</span>
        </button>
      ))}
    </>
  );
};
