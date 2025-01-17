import React from "react";
import Svg from "./Svg";
import Icon from "./Compiler";

export const ARIcon: React.FC<{
  size?: string | number | undefined;
  variant?: "linear" | "bulk";
  icon:
    | "Add"
    | "CloseSquare"
    | "Drive"
    | "Folder"
    | "Trash"
    | "Upload"
    | "Image"
    | "Import"
    | "Bold"
    | "Italic"
    | "Underline"
    | "BulletList"
    | "NumberList"
    | "TextAlingLeft"
    | "TextAlingCenter"
    | "TextAlingRight";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties | undefined;
}> = ({ size, variant = "linear", icon, fill = "var(--dark)", stroke = "var(--dark)", strokeWidth = 2, style }) => {
  const { Compiler } = new Icon(fill, stroke, strokeWidth);

  return (
    <Svg width={size} height={size} style={style}>
      {Compiler(variant, icon)}
    </Svg>
  );
};
