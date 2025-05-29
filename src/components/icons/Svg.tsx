import React from "react";
import { IChildren } from "../../libs/types/IGlobalProps";

const Svg: React.FC<React.SVGProps<SVGElement> & IChildren> = ({
  children,
  viewBox,
  fill = "none",
  width = 32,
  height = 32,
  style,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ?? "0 0 24 24"}
      fill={fill}
      width={width}
      height={height}
      style={style}
    >
      {children}
    </svg>
  );
};

export default Svg;
