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

export type PrimitiveType = string | number | boolean;

type Props<T, E extends PrimitiveType> = TSelectCustomProps & {
  list: TOptionProps<T, E>[];
  value?: PrimitiveType | PrimitiveType[];
  isMultiple?: boolean;
  children?: ReactNode;
  renderOption?: (option: TOptionProps<T, E>, isChosen?: boolean) => ReactNode;
  renderDisplayOption?: (
    option: TOptionProps<T, E>,
    removeOptionFn?: () => void
  ) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps<T, E>) => void;
  onChange?: GlobalTypes.ReactStateAction<PrimitiveType | PrimitiveType[]>;
  selectValueControlled?: TOptionProps<T, E> | TOptionProps<T, E>[];
  setSelectValueControlled?: GlobalTypes.ReactStateAction<
    TOptionProps<T, E> | TOptionProps<T, E>[]
  >;
  renderBeforeList?: ReactNode;
  renderAfterList?: ReactNode;
  renderEmptyListPlaceholder?: ReactNode;
  classNameWrapperOptions?: string;
};

export function Select<T, E extends PrimitiveType>({
  list,
  value,
  isShowContent,
  isMultiple = false,
  renderBeforeList,
  renderAfterList,
  renderEmptyListPlaceholder,
  selectValueControlled,
  classNameWrapperOptions,
  setSelectValueControlled,
  setIsShowContent,
  onChange,
  onChangeSideEffect,
  children,
  renderOption,
  renderDisplayOption,
  ...props
}: Props<T, E>): JSX.Element {
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

  const [selectedOption, setSelectedOption] =
    setSelectValueControlled != null
      ? [selectValueControlled, setSelectValueControlled]
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useState<TOptionProps<T, E> | TOptionProps<T, E>[]>(() => {
          if (isMultiple) {
            assertArray(value);
            return value
              ? list.filter((item) => value.filter((val) => val === item.value))
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
    onChange?.(newSelectedList.map((option) => option.value));
  };

  const getOptionUI = (option: TOptionProps<T, E>) => {
    if (renderOption) {
      let isChosen: boolean;
      if (isMultiple) {
        assertArray(selectedOption);
        isChosen = selectedOption
          .map((option) => option.value)
          .includes(option.value);
      } else {
        isChosen = option.value === value;
      }
      return renderOption(option, isChosen);
    }
    if (!isMultiple) {
      assertNotArray<TOptionProps<T, E>>(selectedOption);
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
      return children;
    }
    if (!isMultiple) {
      assertNotArray<TOptionProps<T, E>>(selectedOption);
      return (
        <SelectDefaultDisplay
          selectedOption={selectedOption}
          isShowContent={_isShowContent}
          placeholder={props.placeHolder}
        />
      );
    }
    assertString(value);
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
    if (!value) {
      return;
    }
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
          <div className={classNameWrapperOptions}>
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
          </div>
          {renderAfterList}
        </>
      }
    >
      {getDisplayUI()}
    </SelectBase>
  );
}
