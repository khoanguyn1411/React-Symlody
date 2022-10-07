import classNames from "classnames";
import React from "react";

import { getAvatarText, getColorFromText } from "./utils";

const SIZE_MAPS = {
  xsmall: "w-5 h-5 min-w-5 min-h-5", //20px
  small: "w-6 h-6 min-w-6 min-h-6", // 24px
  default: "w-8 h-8 min-w-8 min-h-8", // 32px
  medium: "w-10 h-10 min-w-10 min-h-10", // 40px,
  large: "w-12 h-12 min-w-12 min-h-12", // 48px
};

type IProps = {
  fullName: string;
  src?: string;
  size?: keyof typeof SIZE_MAPS;
  className?: string;
  isBorder?: boolean;
  rounded?: "md" | "full";
  avatarTextLength?: number;
  isFullText?: boolean;
  backgroundColor?: string;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
};

export const Avatar: React.FC<IProps> = ({
  isFullText = false,
  fullName = "Simplamo®",
  src,
  size = "default",
  className,
  backgroundColor,
  isBorder = false,
  rounded = "full",
  avatarTextLength,
  fontSize,
  fontColor,
  fontWeight,
}) => {
  // const char =
  //   typeof fullName === "string"
  //     ? fullName.trim().slice(0, 1).toUpperCase()
  //     : "T";
  const text = getAvatarText(fullName || "Symphony", avatarTextLength);

  return (
    <span
      role="img"
      aria-label={fullName}
      className={classNames(
        "flex items-center justify-center min-w-max text-white overflow-hidden font-normal select-none relative bg-cover",
        SIZE_MAPS[size],
        {
          "border-2 border-white": isBorder,
          "rounded-md": rounded === "md",
          "rounded-full": rounded === "full",
        },
        className
      )}
      style={{
        backgroundColor: backgroundColor ?? getColorFromText(text),
        backgroundImage: src && `url(${src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {!src ? (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="20"
            y="22"
            fontSize={fontSize ?? (avatarTextLength > 1 ? 18 : 20)}
            fill={fontColor ?? "white"}
            fontWeight={fontWeight}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {isFullText ? fullName : text}
          </text>
        </svg>
      ) : null}
    </span>
  );
};
