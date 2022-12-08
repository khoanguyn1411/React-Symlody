import { ReactNode, useRef, useState } from "react";

import { GlobalTypes } from "@/utils";
import {
  assertArray,
  assertNotArray,
  assertString,
} from "@/utils/services/common-service";

import { SelectCustom } from "../select-custom/SelectCustom";
import { TOptionProps, TSelectCustomProps } from "../type";
import { SelectMultipleDisplay } from "./select-multiple/SelectMultipleDisplay";
import { SelectMultipleOption } from "./select-multiple/SelectMultipleOption";
import { SelectDefaultDisplay } from "./select-single/SelectSingleDisplay";
import { SelectDefaultOption } from "./select-single/SelectSingleOption";

type Props = TSelectCustomProps & {
  list: TOptionProps[];
  value?: string | string[];
  isMultiple?: boolean;
  children?: (option: TOptionProps | TOptionProps[]) => ReactNode;
  renderOption?: (option: TOptionProps) => ReactNode;
  renderDisplayOption?: (
    option: TOptionProps,
    removeOptionFn?: () => void
  ) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps) => void;
  onChange?: GlobalTypes.ReactStateAction<string | string[]>;
};

export const SelectTest: React.FC<Props> = ({
  list,
  value,
  isShowContent,
  isMultiple = false,
  children,
  setIsShowContent,
  renderOption,
  onChange,
  onChangeSideEffect,
  renderDisplayOption,
  ...props
}) => {
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
    TOptionProps | TOptionProps[]
  >(() => {
    if (isMultiple) {
      assertArray(value);
      return value
        ? list.filter((item) => value.filter((val) => val === item.value))
        : [];
    }
    return list.find((item) => item.value === value) ?? null;
  });

  const handleSetSelectedItem = (option: TOptionProps) => () => {
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
      onChange?.(newSelectedList.map((option) => option.value));
      setSelectedOption(newSelectedList);
      return;
    }
    const newSelectedList = [...selectedOption, option];
    onChange?.(newSelectedList.map((option) => option.value));
    setSelectedOption(newSelectedList);
  };

  const getOptionUI = (option: TOptionProps) => {
    if (renderOption) {
      return renderOption(option);
    }
    if (!isMultiple) {
      assertNotArray<TOptionProps>(selectedOption);
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
      assertNotArray<TOptionProps>(selectedOption);
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
      renderListItem={list.map((option, index) => {
        return (
          <li
            onClick={handleSetSelectedItem(option)}
            key={index}
            role={"menuitem"}
            onKeyDown={null}
            tabIndex={0}
          >
            {getOptionUI(option)}
          </li>
        );
      })}
    >
      {getDisplayUI()}
    </SelectCustom>
  );
};
