"use client";

import React, { useRef } from "react";
import { Props } from "./Types";

const Paragraph: React.FC<Props> = ({
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

  return <p className={_className}>{upperCase ? children.toLocaleUpperCase() : children}</p>;
};

Paragraph.displayName = "Paragraph";
export default Paragraph;
