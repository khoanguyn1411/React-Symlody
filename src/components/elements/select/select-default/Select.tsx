import { ReactNode, useEffect, useRef, useState } from "react";

import { GlobalTypes } from "@/utils";
import { CommonAssertion } from "@/utils/funcs/common-assertion";
import { Primitive } from "@/utils/types";

import { SelectBase } from "../select-base/SelectBase";
import { SelectMultipleDisplay } from "../select-components/select-multiple/SelectMultipleDisplay";
import { SelectMultipleOption } from "../select-components/select-multiple/SelectMultipleOption";
import { SelectDefaultDisplay } from "../select-components/select-single/SelectSingleDisplay";
import { SelectDefaultOption } from "../select-components/select-single/SelectSingleOption";
import { TOptionProps, TSelectCustomProps } from "../type";

type Props<T, E extends Primitive> = TSelectCustomProps & {
  list: TOptionProps<T, E>[];
  value?: Primitive | Primitive[];
  isMultiple?: boolean;
  children?: ReactNode;
  renderOption?: (option: TOptionProps<T, E>, isChosen?: boolean) => ReactNode;
  renderDisplayOption?: (
    option: TOptionProps<T, E>,
    removeOptionFn?: () => void
  ) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps<T, E>) => void;
  onChange?: GlobalTypes.ReactStateAction<Primitive | Primitive[]>;
  selectValueControlled?: TOptionProps<T, E> | TOptionProps<T, E>[];
  setSelectValueControlled?: GlobalTypes.ReactStateAction<
    TOptionProps<T, E> | TOptionProps<T, E>[]
  >;
  renderBeforeList?: ReactNode;
  renderAfterList?: ReactNode;
  renderEmptyListPlaceholder?: ReactNode;
  classNameWrapperOptions?: string;
};

export function Select<T, E extends Primitive>({
  list,
  value,
  isShowContent,
  isMultiple = false,
  renderBeforeList,
  renderAfterList,
  renderEmptyListPlaceholder,
  selectValueControlled,
  classNameWrapperOptions,
  maxHeight,
  setSelectValueControlled,
  setIsShowContent,
  onChange,
  onChangeSideEffect,
  children,
  renderOption,
  renderDisplayOption,
  ...props
}: Props<T, E>): JSX.Element {
  const [_isShowContent, _setIsShowContent] =
    isShowContent != null && setIsShowContent != null
      ? [isShowContent, setIsShowContent]
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useState<boolean>(false);

  const [selectedOption, setSelectedOption] =
    setSelectValueControlled != null
      ? [selectValueControlled, setSelectValueControlled]
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useState<TOptionProps<T, E> | TOptionProps<T, E>[]>(() => {
          if (isMultiple) {
            CommonAssertion.assertArray(value);
            return value
              ? list.filter((item) => value.includes(item.value))
              : [];
          }
          return list.find((item) => item.value === value) ?? null;
        });

  const handleSetSelectedItem = (option: TOptionProps<T, E>) => () => {
    onChangeSideEffect?.(option);
    if (!isMultiple) {
      onChange?.(option.value);

      setSelectedOption(option);
      _setIsShowContent(false);
      return;
    }
    CommonAssertion.assertArray(selectedOption);
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
    onChange?.(newSelectedList.map((option) => option.value));
  };

  const getOptionUI = (option: TOptionProps<T, E>) => {
    if (renderOption) {
      let isChosen: boolean;
      if (isMultiple) {
        CommonAssertion.assertArray(selectedOption);
        isChosen = selectedOption
          .map((option) => option.value)
          .includes(option.value);
      } else {
        isChosen = option.value === value;
      }
      return renderOption(option, isChosen);
    }
    if (!isMultiple) {
      CommonAssertion.assertNotArray<TOptionProps<T, E>>(selectedOption);
      return (
        <SelectDefaultOption {...option} selectedOption={selectedOption} />
      );
    }
    CommonAssertion.assertArray(selectedOption);
    return <SelectMultipleOption selectedOption={selectedOption} {...option} />;
  };

  const getDisplayUI = () => {
    if (children) {
      return children;
    }
    if (!isMultiple) {
      CommonAssertion.assertNotArray<TOptionProps<T, E>>(selectedOption);
      return (
        <SelectDefaultDisplay
          selectedOption={selectedOption}
          isShowContent={_isShowContent}
          placeholder={props.placeHolder}
        />
      );
    }
    CommonAssertion.assertArray(selectedOption);
    return (
      <SelectMultipleDisplay
        selectedOption={selectedOption}
        handleSetSelectedItem={handleSetSelectedItem}
        style={props.style}
        placeholder={props.placeHolder}
        renderDisplayOption={renderDisplayOption}
      />
    );
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    if (isMultiple) {
      CommonAssertion.assertArray(selectedOption);
      const newSelectedList = selectedOption.filter(
        (_option) => _option.value !== value
      );
      setSelectedOption(newSelectedList);
      return;
    }
    setSelectedOption(list.find((option) => option.value === value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const testRef = useRef();

  return (
    <SelectBase
      {...props}
      maxHeight={maxHeight}
      isShowContent={_isShowContent}
      setIsShowContent={_setIsShowContent}
      renderListItem={
        <>
          {renderBeforeList}
          {list.length === 0 && renderEmptyListPlaceholder}
          <div className={classNameWrapperOptions}>
            {list.map((option, index) => {
              const isSelectedOption = () => {
                if (selectedOption == null) {
                  return false;
                }
                if (Array.isArray(selectedOption)) {
                  return selectedOption
                    .map((opt) => opt.value)
                    .includes(option.value);
                }
                return option.value === selectedOption.value;
              };
              return (
                <li
                  className={isSelectedOption() ? "selected-select-option" : ""}
                  ref={testRef}
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
          </div>
          {renderAfterList}
        </>
      }
    >
      {getDisplayUI()}
    </SelectBase>
  );
}
