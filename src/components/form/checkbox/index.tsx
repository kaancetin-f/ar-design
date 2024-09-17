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
  let _checkbox = useRef<HTMLInputElement>(null);
  let _wrapperClassName = "ar-checkbox-wrapper";
  let _checkboxClassName = "ar-checkbox";

  // checkbox -> variant
  if (variant) _checkboxClassName += ` ${variant}`;

  // status
  _checkboxClassName += ` light`;

  // border
  _checkboxClassName += ` border-style-solid`;
  _checkboxClassName += ` border-radius-${border?.radius || "sm"}`;

  return (
    <div className={_wrapperClassName}>
      <label>
        <input
          type={attributes.type || "checkbox"}
          {...attributes}
          onChange={(event) => {
            (() => {
              const _current = _checkbox.current;
              if (!_current) return;

              event.target.checked
                ? _current.classList.replace("light", status)
                : _current.classList.replace(status, "light");
            })();

            (() => attributes.onChange && attributes.onChange(event))();
          }}
        />

        <span>
          <span ref={_checkbox} className={_checkboxClassName}></span>
          {label && <span className="label">{label}</span>}
        </span>
      </label>
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
