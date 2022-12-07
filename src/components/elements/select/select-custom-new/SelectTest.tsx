import { ReactNode, useState } from "react";

import { GlobalTypes } from "@/utils";

import { SelectCustom } from "../select-custom/SelectCustom";
import { TOptionProps, TSelectCustomProps } from "../type";
import { SelectDefaultDisplay } from "./SelectDefaultDisplay";
import { SelectDefaultOption } from "./SelectDefaultOption";

type Props = TSelectCustomProps & {
  list: TOptionProps[];
  value?: string;
  renderOption?: (option: TOptionProps) => ReactNode;
  onChangeSideEffect?: (option: TOptionProps) => void;
  onChange?: GlobalTypes.ReactStateAction<string>;
};

export const SelectTest: GlobalTypes.FCPropsWithChildren<Props> = ({
  list,
  value,
  isShowContent,
  setIsShowContent,
  renderOption,
  onChange,
  onChangeSideEffect,
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

  const [selectedOption, setSelectedOption] = useState<TOptionProps>(
    list.find((item) => item.value === value) ?? null
  );
  const handleSetSelectedItem = (option: TOptionProps) => () => {
    onChange?.(option.value);
    onChangeSideEffect?.(option);
    setSelectedOption(option);
    _setIsShowContent(false);
  };

  const getOptionUI = (option: TOptionProps) => {
    if (renderOption) {
      return renderOption(option);
    }
    return (
      <SelectDefaultOption
        {...option}
        selectedUncontrolledOption={selectedOption}
        selectedControlledValue={value}
      />
    );
  };

  return (
    <SelectCustom
      {...props}
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
      {props.children ?? (
        <SelectDefaultDisplay
          selectedUncontrolledOption={selectedOption}
          selectedControlledValue={value}
          isShowContent={_isShowContent}
          placeholder={props.placeHolder}
        />
      )}
    </SelectCustom>
  );
};
