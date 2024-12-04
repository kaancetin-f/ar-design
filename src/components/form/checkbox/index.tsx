"use client";

import React, { forwardRef, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/form/checkbox/checkbox.css";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Checkbox = forwardRef<HTMLInputElement, IProps>(
  ({ label, size = "normal", status, border = { radius: "sm" }, upperCase, ...attributes }, ref) => {
    // refs
    const _checkbox = useRef<HTMLInputElement>(null);
    const _checkboxClassName: string[] = ["ar-checkbox"];

    // states
    const [checked, setChecked] = useState<boolean>(false);

    _checkboxClassName.push(
      ...Utils.GetClassName("filled", checked ? status : "light", border, size, undefined, attributes.className)
    );

    return (
      <div className="ar-checkbox-wrapper">
        <label>
          <input
            ref={ref}
            type={"checkbox"}
            {...attributes}
            size={0}
            onChange={(event) => {
              (() => {
                const _current = _checkbox.current;
                if (!_current) return;

                setChecked(event.target.checked);
              })();

              (() => attributes.onChange && attributes.onChange(event))();
            }}
          />

          <span>
            <span ref={_checkbox} className={_checkboxClassName.map((c) => c).join(" ")}></span>
            {label && <span className="label">{upperCase ? label.toUpperCase() : label}</span>}
          </span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
