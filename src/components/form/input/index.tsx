"use client";

import React, { forwardRef } from "react";
import "../../../assets/css/components/form/input/input.css";
import Button from "../button";
import IProps from "./IProps";

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      variant = "outlined",
      status = "light",
      icon,
      border = { radius: "sm" },
      button,
      addon,
      ...attributes
    },
    ref
  ) => {
    // variables
    let _wrapperClassName = "ar-input-wrapper";
    let _addonBeforeClassName = "addon-before";
    let _addonAfterClassName = "addon-after";
    let _inputWrapperClassName = "ar-input";
    let _inputClassName = "";

    // input wrapper className
    if (icon && icon.element) {
      _inputWrapperClassName += ` icon`;
      _inputWrapperClassName += ` icon-${icon.position ?? "start"}`;
    }

    // input className
    if (variant) _inputClassName += `${variant}`;

    if (status) _inputClassName += ` ${status}`;

    // border radius
    _inputClassName += ` border-radius-${border.radius}`;

    // addon className
    if (addon) {
      _wrapperClassName += ` addon`;

      // variant
      _addonBeforeClassName += ` ${addon?.variant || "filled"}`;
      _addonAfterClassName += ` ${addon?.variant || "filled"}`;

      // status
      _addonBeforeClassName += ` ${status}`;
      _addonAfterClassName += ` ${status}`;

      // border radius
      _addonBeforeClassName += ` border-radius-${border?.radius || "sm"}`;
      _addonAfterClassName += ` border-radius-${border?.radius || "sm"}`;
    }

    if (attributes.className) _inputClassName += ` ${attributes.className}`;

    return (
      <div className={_wrapperClassName}>
        {/* Addon Before */}
        {addon?.before && <span className={_addonBeforeClassName}>{addon?.before}</span>}

        <div className={_inputWrapperClassName}>
          {/* Icon */}
          {icon?.element && <span className="icon-element">{icon.element}</span>}

          {/* Input */}
          <input
            ref={ref}
            {...attributes}
            size={20}
            className={_inputClassName}
            onChange={(event) => {
              // Disabled gelmesi durumunda işlem yapmasına izin verme...
              if (attributes.disabled) return;

              (() => {
                if (attributes.onChange) {
                  // Mevcut değeri alın
                  const currentValue = event.target.value;

                  // Yeni değeri oluşturun ve onChange fonksiyonunu çağırın
                  const newValue = `${addon?.before || ""}${currentValue}${addon?.after || ""}`;

                  attributes.onChange({
                    ...event,
                    target: { ...event.target, value: newValue },
                  });
                }
              })();
            }}
          />
        </div>

        {/* Addon Afrer */}
        {addon?.after && <span className={_addonAfterClassName}>{addon?.after}</span>}

        {/* Button */}
        {button && (
          <Button
            {...button}
            status={status}
            border={{ radius: border.radius }}
            disabled={attributes.disabled}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
