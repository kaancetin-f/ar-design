"use client";

import React, { useRef } from "react";
import { Props } from "./Types";
import "../../../assest/css/form/input/input.css";
import Button from "../button";

const Input: React.FC<Props> = ({
  variant = "outlined",
  icon,
  border,
  button,
  addon,
  ...attributes
}) => {
  // refs
  let _wrapperClassName = useRef<string>("ar-input-wrapper").current;
  let _addonBeforeClassName = useRef<string>("addon-before").current;
  let _addonAfterClassName = useRef<string>("addon-after").current;
  let _inputWrapperClassName = useRef<string>("ar-input").current;
  let _inputClassName = useRef<string>("").current;

  // input wrapper className
  if (icon && icon.element) {
    _inputWrapperClassName += ` icon`;
    _inputWrapperClassName += ` icon-${icon.position ?? "start"}`;
  }

  // input className
  if (variant) _inputClassName += `${variant}`;
  if (border && border.radius) _inputClassName += ` border-radius-${border.radius}`;

  // button className
  // ...

  // addon className
  if (addon) {
    _wrapperClassName += ` addon`;

    // Border olması durumunda...
    if (border) {
      if ((addon.before || addon.after) && border.radius) {
        _addonBeforeClassName += ` border-radius-${border.radius}`;
        _addonAfterClassName += ` border-radius-${border.radius}`;
      }
    }
  }

  if (attributes.disabled) _inputClassName += ` disabled`;
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
          {...attributes}
          onChange={(event) => {
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
          className={_inputClassName}
        />
      </div>

      {/* Addon Afrer */}
      {addon?.after && <span className={_addonAfterClassName}>{addon?.after}</span>}

      {/* Button */}
      {button && <Button {...button} border={{ radius: border?.radius }} />}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
