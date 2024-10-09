"use client";

import React, { useRef } from "react";
import "../../../assets/css/components/form/switch/switch.css";
import IProps from "./IProps";

const Switch: React.FC<IProps> = ({
  label,
  status = "primary",
  border = { radius: "pill" },
  ...attributes
}) => {
  // refs
  let _switch = useRef<HTMLInputElement>(null);

  // variables
  let _wrapperClassName = "ar-switch-wrapper";
  let _switchClassName = `ar-switch filled`;
  let _handleClassName = `handle`;

  // status
  _switchClassName += ` light`;

  // border
  _switchClassName += ` border-style-solid`;
  _switchClassName += ` border-radius-${border.radius}`;
  _handleClassName += ` border-radius-${border.radius}`;

  return (
    <div className={_wrapperClassName}>
      <label>
        <input
          type={attributes.type || "checkbox"}
          {...attributes}
          size={0}
          onChange={(event) => {
            (() => {
              const _current = _switch.current;
              if (!_current) return;

              event.target.checked
                ? _current.classList.replace("light", status)
                : _current.classList.replace(status, "light");
            })();

            (() => attributes.onChange && attributes.onChange(event))();
          }}
        />

        <span ref={_switch} className={_switchClassName}>
          <span className={_handleClassName}></span>
        </span>

        {label && <span className="label">{label}</span>}
      </label>
    </div>
  );
};

Switch.displayName = "Switch";
export default Switch;
