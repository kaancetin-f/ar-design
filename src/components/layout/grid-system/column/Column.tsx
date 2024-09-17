"use client";

import React, { useRef } from "react";
import { Props } from "./Types";

const Column: React.FC<Props> = ({ children, size, align }) => {
  // refs
  let _className = useRef<string>("").current;

  // className
  if (size) {
    _className = Object.entries(size)
      .map(([key, value]) => `col-${key}-${value}`)
      .join(" ");
  } else {
    _className = "col";
  }

  if (align) _className += ` ${align}`;

  return <div className={_className}>{children}</div>;
};

export default Column;
