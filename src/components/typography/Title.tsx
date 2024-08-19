import React, { useRef } from "react";
import { TitleProps } from "./Types";

const Title: React.FC<TitleProps> = ({ children, Level, align = "left", size, upperCase = false }) => {
  // refs
  let _className = useRef<string>("ar-typography-title").current;

  if (align) _className += ` ${align}`;
  if (size) _className += ` ${size}`;

  return <Level className={_className}>{upperCase ? children.toLocaleUpperCase() : children}</Level>;
};

export default Title;
