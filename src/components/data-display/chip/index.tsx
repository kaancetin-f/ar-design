"use client";

import React, { useRef } from "react";
import "../../../assets/css/components/data-display/chip/chip.css";
import IProps from "./IProps";

const Chip: React.FC<IProps> = ({
  variant = "outlined",
  status = "primary",
  border = { radius: "sm" },
  text,
}) => {
  let _className = useRef<string>("ar-chip").current;

  // input className
  if (variant) _className += ` ${variant}`;
  if (status) _className += ` ${status}`;

  // border
  _className += ` border-style-solid`;
  _className += ` border-radius-${border.radius}`;

  return <span className={_className}>{text}</span>;
};

export default Chip;
