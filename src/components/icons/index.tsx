import React from "react";
import Svg from "./Svg";
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
  size,
  variant = "linear",
  icon,
  fill = "var(--dark)",
  stroke = "var(--dark)",
  strokeWidth = 1,
  style,
}) => {
  const { Compiler } = new Icon(fill, stroke, strokeWidth);

  return (
    <Svg viewBox={viewBox} fill={fill} width={size} height={size} style={style}>
      {Compiler(variant, icon)}
    </Svg>
  );
};
