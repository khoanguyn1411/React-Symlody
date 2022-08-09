import classNames from "classnames";

type TProps = {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: "modal" | "default";
  handleSideEffect?: (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    isDisableOnChange: boolean;
  };
};

export const Input: React.FC<TProps> = ({
  type,
  value = "",
  onChange,
  handleSideEffect,
  placeholder,
  style = "default",
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleSideEffect) {
      if (handleSideEffect(event, onChange).isDisableOnChange) {
        return;
      }
    }
    return onChange(event.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChangeEvent}
      placeholder={placeholder}
      className={classNames(
        "w-full p-2 border-gray-200 text-black outline-none rounded-md",
        {
          "bg-gray-100": style === "modal",
          "border-[1.5px]": style === "default",
        }
      )}
    />
  );
};
