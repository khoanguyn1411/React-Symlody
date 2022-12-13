import classNames from "classnames";

interface TCheckDone {
  isActive: boolean;
}
export const CheckDone: React.FC<TCheckDone> = ({ isActive }) => {
  return (
    <span>
      <i
        className={classNames(
          "fas fa-check-circle",
          isActive ? "text-green-400" : "text-gray-400"
        )}
      />
    </span>
  );
};
