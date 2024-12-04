"use client";

import React, { forwardRef, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/form/radio/radio.css";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Radio = forwardRef<HTMLInputElement, IProps>(
  ({ label, size = "normal", status, border = { radius: "sm" }, upperCase, ...attributes }, ref) => {
    // refs
    const _checkbox = useRef<HTMLInputElement>(null);
    const _checkboxClassName: string[] = ["ar-radio"];

    // states
    const [checked, setChecked] = useState<boolean>(false);

    _checkboxClassName.push(...Utils.GetClassName("filled", undefined, border, size, undefined, attributes.className));

    return (
      <div className="ar-radio-wrapper">
        <label>
          <input
            ref={ref}
            type={"radio"}
            {...attributes}
            size={0}
            onChange={(event) => {
              (() => {
                const _current = _checkbox.current;
                if (!_current) return;

                // 'checked' durumunun false olup olmadığını kontrol et
                if (event.target.checked === false) {
                  console.log("Radio button is unchecked");
                }

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

Radio.displayName = "Radio";

export default Radio;
