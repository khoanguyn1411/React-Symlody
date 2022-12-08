import { ReactNode, useEffect, useRef, useState } from "react";

import { GlobalTypes } from "@/utils";
import {
  assertArray,
  assertNotArray,
  assertString,
} from "@/utils/services/common-service";

import { SelectBase } from "../select-base/SelectBase";
import { SelectMultipleDisplay } from "../select-components/select-multiple/SelectMultipleDisplay";
import { SelectMultipleOption } from "../select-components/select-multiple/SelectMultipleOption";
import { SelectDefaultDisplay } from "../select-components/select-single/SelectSingleDisplay";
import { SelectDefaultOption } from "../select-components/select-single/SelectSingleOption";
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
  // setOptionChosen?: GlobalTypes.ReactStateAction<
  //   TOptionProps<T> | TOptionProps<T>[]
  // >;
  children?: (option: TOptionProps<T>) => ReactNode;
  renderOption?: (option: TOptionProps<T>, isChosen?: boolean) => ReactNode;
  renderDisplayOption?: (
    option: TOptionProps<T>,
    removeOptionFn?: () => void
  ) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps<T>) => void;
  onChange?: GlobalTypes.ReactStateAction<string | string[]>;
  renderBeforeList?: ReactNode;
  renderAfterList?: ReactNode;
  renderEmptyListPlaceholder?: ReactNode;
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
  renderEmptyListPlaceholder,
  onChange,
  onChangeSideEffect,
  renderDisplayOption,
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
      _setIsShowContent(false);
      return;
    }
    assertArray(selectedOption);
    const optionValues = selectedOption.map((option) => option.value);
    if (optionValues.includes(option.value)) {
      const newSelectedList = selectedOption.filter(
        (_option) => _option.value !== option.value
      );
      setSelectedOption(newSelectedList);
      onChange?.(newSelectedList.map((option) => option.value));
      return;
    }
    const newSelectedList = [...selectedOption, option];
    setSelectedOption(newSelectedList);
  };

  const getOptionUI = (option: TOptionProps<T>) => {
    if (renderOption) {
      const isChosen = option.value === value;
      return renderOption(option, isChosen);
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
    assertNotArray<TOptionProps<T>>(selectedOption);
    assertString(value);
    if (children) {
      // let isNoSelectedOption: boolean;
      // if (isMultiple) {

      //   assertArray(selectedOption);
      //   isNoSelectedOption =
      //     selectedOption == null || selectedOption.length === 0;
      // } else {
      //   isNoSelectedOption = selectedOption == null;
      // }

      // if (isNoSelectedOption && !props.placeHolder) {
      //   console.warn(
      //     "Seem like your select does not include a default value. You should provide a placeholder in such case."
      //   );
      //   return <></>;
      // }
      // if (isNoSelectedOption) {
      //   return props.placeHolder;
      // }
      return children(selectedOption);
    }
    if (!isMultiple) {
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

  useEffect(() => {
    if (isMultiple) {
      assertArray(selectedOption);
      const newSelectedList = selectedOption.filter(
        (_option) => _option.value !== value
      );
      setSelectedOption(newSelectedList);
      return;
    }
    setSelectedOption(list.find((option) => option.value === value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <SelectBase
      {...props}
      wrapperSelectRef={wrapperSelectRef}
      isShowContent={_isShowContent}
      setIsShowContent={_setIsShowContent}
      renderListItem={
        <>
          {renderBeforeList}
          {list.length === 0 && renderEmptyListPlaceholder}
          {list.map((option, index) => {
            return (
              <li
                onClick={handleSetSelectedItem(option)}
                key={`${option.value}-${index}`}
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
    </SelectBase>
  );
}
