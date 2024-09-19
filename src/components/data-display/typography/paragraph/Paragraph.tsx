"use client";

import React, { useRef } from "react";
import IProps from "./IProps";

const Paragraph: React.FC<IProps> = ({
  children,
  color,
  align = "left",
  size,
  upperCase = false,
}) => {
  // refs
  let _className = useRef<string>("ar-typography-paragraph").current;

  if (align) _className += ` ${align}`;
  if (color) _className += ` ${color}`;
  if (size) _className += ` ${size}`;

  return (
    <p className={_className}>
      {typeof children === "string" && upperCase ? children.toLocaleUpperCase() : children}
    </p>
  );
};

Paragraph.displayName = "Paragraph";
export default Paragraph;
