import classNames from "classnames";

type TProps = {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  style?: "modal" | "default";
};

export const Input: React.FC<TProps> = ({
  type,
  value = "",
  onChange,
  placeholder,
  style = "default",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(
        "w-full p-2 mt-2 border-gray-300 text-black outline-none rounded-md",
        {
          "bg-gray-100": style === "modal",
          "border-[1.5px]": style === "default",
        }
      )}
    />
  );
};
