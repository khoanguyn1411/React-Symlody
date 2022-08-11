import classNames from "classnames";

type TSideEffect = {
  newValue: string;
};
type TProps = {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  style?: "modal" | "default";
  className?: string;
  onChange?: (value: string) => void;
  handleSideEffect?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => TSideEffect;
};

export const Input: React.FC<TProps> = ({
  type,
  value = "",
  placeholder,
  style = "default",
  className,
  onChange,
  handleSideEffect,
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleSideEffect) {
      const returnValue = handleSideEffect(event);
      const newValue = returnValue.newValue;
      return onChange(newValue);
    }
    return !event.target.value.startsWith(" ") && onChange(event.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChangeEvent}
      placeholder={placeholder}
      className={classNames(
        "w-full p-2 border-gray-200 text-black outline-none rounded-md",
        className,
        {
          "bg-gray-100": style === "modal",
          "border-[1.5px]": style === "default",
        }
      )}
    />
  );
};
