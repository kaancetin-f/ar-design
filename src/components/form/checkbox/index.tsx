"use client";

import React, { useRef } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/form/checkbox/checkbox.css";

const Checkbox: React.FC<Props> = ({
  label,
  variant = "outlined",
  status = "primary",
  border,
  ...attributes
}) => {
  // refs
  let _wrapperClassName = useRef<string>("ar-checkbox-wrapper").current;
  let _checkboxClassName = useRef<string>("ar-checkbox").current;

  // checkbox -> variant
  if (variant) _checkboxClassName += ` ${variant}`;

  // status
  if (status) _checkboxClassName += ` ${status}`;

  // border
  _checkboxClassName += ` border-style-solid`;
  _checkboxClassName += ` border-radius-${border?.radius || "sm"}`;

  return (
    <div className={_wrapperClassName}>
      <label>
        <input type={attributes.type || "checkbox"} {...attributes} />
        <span>
          <span className={_checkboxClassName}></span>
          {label && <span className="label">{label}</span>}
        </span>
      </label>
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
