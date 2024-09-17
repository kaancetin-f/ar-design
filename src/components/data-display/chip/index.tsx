"use client";

import React, { useRef } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/data-display/chip/chip.css";

const Chip: React.FC<Props> = ({ variant = "outlined", color = "primary", border, text }) => {
  let _className = useRef<string>("ar-chip").current;

  // input className
  if (variant) _className += ` ${variant}`;
  if (color) _className += ` ${color}`;

  // border
  _className += ` border-style-${border?.style || "solid"}`;
  _className += ` border-radius-${border?.radius || "sm"}`;

  return <span className={_className}>{text}</span>;
};

export default Chip;
