import { ReactNode, useRef, useState } from "react";

import { GlobalTypes } from "@/utils";
import {
  assertArray,
  assertNotArray,
  assertString,
} from "@/utils/services/common-service";

import { SelectMultipleDisplay } from "../select-components/select-multiple/SelectMultipleDisplay";
import { SelectMultipleOption } from "../select-components/select-multiple/SelectMultipleOption";
import { SelectDefaultDisplay } from "../select-components/select-single/SelectSingleDisplay";
import { SelectDefaultOption } from "../select-components/select-single/SelectSingleOption";
import { SelectCustom } from "../select-custom/SelectCustom";
import { TOptionProps, TSelectCustomProps } from "../type";

export type TItemListSelect = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  key?: string;
  value: string;
};

type Props<T> = TSelectCustomProps & {
  list: TOptionProps<T>[];
  value?: string | string[];
  isMultiple?: boolean;
  setOptionChosen?: GlobalTypes.ReactStateAction<
    TOptionProps<T> | TOptionProps<T>[]
  >;
  children?: (option: TOptionProps<T> | TOptionProps<T>[]) => ReactNode;
  renderOption?: (option: TOptionProps<T>) => ReactNode;
  renderDisplayOption?: (
    option: TOptionProps<T>,
    removeOptionFn?: () => void
  ) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps<T>) => void;
  onChange?: GlobalTypes.ReactStateAction<string | string[]>;
  renderBeforeList?: ReactNode;
  renderAfterList?: ReactNode;
};

export function Select<T>({
  list,
  value,
  isShowContent,
  isMultiple = false,
  renderBeforeList,
  renderAfterList,
  children,
  setIsShowContent,
  renderOption,
  onChange,
  onChangeSideEffect,
  renderDisplayOption,
  setOptionChosen,
  ...props
}: Props<T>): JSX.Element {
  let _isShowContent: boolean,
    _setIsShowContent: GlobalTypes.ReactStateAction<boolean>;

  if (isShowContent != null && setIsShowContent != null) {
    _isShowContent = isShowContent;
    _setIsShowContent = setIsShowContent;
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isShowContent, setIsShowContent] = useState<boolean>(false);
    _isShowContent = isShowContent;
    _setIsShowContent = setIsShowContent;
  }

  const wrapperSelectRef = useRef(null);
  const elementWrapperSelect = wrapperSelectRef?.current;

  const [selectedOption, setSelectedOption] = useState<
    TOptionProps<T> | TOptionProps<T>[]
  >(() => {
    if (isMultiple) {
      assertArray(value);
      return value
        ? list.filter((item) => value.filter((val) => val === item.value))
        : [];
    }
    return list.find((item) => item.value === value) ?? null;
  });

  const handleSetSelectedItem = (option: TOptionProps<T>) => () => {
    onChangeSideEffect?.(option);
    if (!isMultiple) {
      onChange?.(option.value);
      setSelectedOption(option);
      setOptionChosen?.(option);
      _setIsShowContent(false);
      return;
    }
    assertArray(selectedOption);
    const optionValues = selectedOption.map((option) => option.value);
    if (optionValues.includes(option.value)) {
      const newSelectedList = selectedOption.filter(
        (_option) => _option.value !== option.value
      );
      onChange?.(newSelectedList.map((option) => option.value));
      setSelectedOption(newSelectedList);
      setOptionChosen?.(option);
      return;
    }
    const newSelectedList = [...selectedOption, option];
    onChange?.(newSelectedList.map((option) => option.value));
    setSelectedOption(newSelectedList);
    setOptionChosen?.(option);
  };

  const getOptionUI = (option: TOptionProps<T>) => {
    if (renderOption) {
      return renderOption(option);
    }
    if (!isMultiple) {
      assertNotArray<TOptionProps<T>>(selectedOption);
      assertString(value);
      return (
        <SelectDefaultOption {...option} selectedOption={selectedOption} />
      );
    }
    assertArray(selectedOption);
    return <SelectMultipleOption selectedOption={selectedOption} {...option} />;
  };

  const getDisplayUI = () => {
    if (children) {
      return children(selectedOption);
    }
    if (!isMultiple) {
      assertNotArray<TOptionProps<T>>(selectedOption);
      assertString(value);
      return (
        <SelectDefaultDisplay
          selectedOption={selectedOption}
          isShowContent={_isShowContent}
          placeholder={props.placeHolder}
        />
      );
    }
    assertArray(selectedOption);
    return (
      <SelectMultipleDisplay
        selectedOption={selectedOption}
        handleSetSelectedItem={handleSetSelectedItem}
        style={props.style}
        placeholder={props.placeHolder}
        renderDisplayOption={renderDisplayOption}
        elementWrapperSelect={elementWrapperSelect}
      />
    );
  };

  return (
    <SelectCustom
      {...props}
      wrapperSelectRef={wrapperSelectRef}
      isShowContent={_isShowContent}
      setIsShowContent={_setIsShowContent}
      renderListItem={
        <>
          {renderBeforeList}
          {list.map((option, index) => {
            return (
              <li
                onClick={handleSetSelectedItem(option)}
                key={option.value + index}
                role={"menuitem"}
                onKeyDown={null}
                tabIndex={0}
              >
                {getOptionUI(option)}
              </li>
            );
          })}
          {renderAfterList}
        </>
      }
    >
      {getDisplayUI()}
    </SelectCustom>
  );
}
