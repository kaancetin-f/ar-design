import React from "react";
import Svg from "./Svg";
import Icon from "./Compiler";

const ARIcon: React.FC<{
  size?: string | number | undefined;
  variant?: "linear" | "bulk";
  icon: "CloseSquare" | "Drive" | "Folder" | "Trash" | "Upload" | "Image";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties | undefined;
}> = ({ size, variant = "linear", icon, fill, stroke, strokeWidth, style }) => {
  const { Compiler } = new Icon(fill, stroke, strokeWidth);

  return (
    <Svg width={size} height={size} style={style}>
      {Compiler(variant, icon)}
    </Svg>
  );
};

export default ARIcon;
