"use client";

import React, { forwardRef } from "react";
import "../../../assets/css/components/form/input/input.css";
import Button from "../button";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      variant = "outlined",
      status = "light",
      size = "normal",
      icon,
      border = { radius: "sm" },
      button,
      addon,
      validation,
      ...attributes
    },
    ref
  ) => {
    // variables
    const _wrapperClassName: string[] = ["ar-input-wrapper"];
    const _addonBeforeClassName: string[] = ["addon-before"];
    const _addonAfterClassName: string[] = ["addon-after"];
    const _inputClassName: string[] = [];

    _inputClassName.push(
      ...Utils.GetClassName(
        variant,
        !Utils.IsNullOrEmpty(validation?.text) ? "danger" : status,
        border,
        size,
        icon,
        attributes.className
      )
    );

    // addon className
    if (addon) {
      _wrapperClassName.push("addon");

      _addonBeforeClassName.push(`${addon.variant || "filled"}`);
      _addonBeforeClassName.push(`${status}`);

      _addonAfterClassName.push(`${addon.variant || "filled"}`);
      _addonAfterClassName.push(`${status}`);

      _addonBeforeClassName.push(`border-radius-${border.radius}`);
      _addonAfterClassName.push(`border-radius-${border.radius}`);
    }

    return (
      <div className={_wrapperClassName.map((c) => c).join(" ")}>
        {/* Addon Before */}
        {addon?.before && <span className={_addonBeforeClassName.map((c) => c).join(" ")}>{addon?.before}</span>}

        <div className="ar-input">
          {/* Icon */}
          {icon?.element && <span className="icon-element">{icon.element}</span>}

          {/* Input */}
          <input
            ref={ref}
            {...attributes}
            size={20}
            className={_inputClassName.map((c) => c).join(" ")}
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

          {validation?.text && <span className="validation">{validation.text}</span>}
        </div>

        {/* Addon Afrer */}
        {addon?.after && <span className={_addonAfterClassName.map((c) => c).join(" ")}>{addon?.after}</span>}

        {/* Button */}
        {button && (
          <Button {...button} status={status} border={{ radius: border.radius }} disabled={attributes.disabled} />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
