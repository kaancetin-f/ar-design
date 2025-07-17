import React from "react";
import Icon from "./Compiler";
import { Icons, IconVariants } from "../../libs/types";

export const ARIcon: React.FC<{
  viewBox?: string;
  size?: string | number | undefined;
  variant?: IconVariants;
  icon: Icons;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties | undefined;
}> = ({
  viewBox,
  size = 16,
  variant = "linear",
  icon,
  fill = "var(--dark)",
  stroke = "var(--dark)",
  strokeWidth = 1,
  style,
}) => {
  const { Compiler } = new Icon(stroke, strokeWidth);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ?? `0 0 16 16`}
      fill={fill}
      width={size}
      height={size}
      style={style}
    >
      {Compiler(variant, icon)}
    </svg>
  );
};
