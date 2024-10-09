"use client";

import React, { useRef } from "react";
import "../../../assets/css/components/form/button/button.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Button: React.FC<IProps> = ({
  children,
  variant = "filled",
  shape,
  status = "primary",
  border,
  size = "normal",
  position,
  icon,
  upperCase,
  ...attributes
}) => {
  // refs
  const _button = useRef<HTMLButtonElement>(null);
  const _buttonClassName: string[] = ["ar-button"];

  _buttonClassName.push(
    ...Utils.GetClassName(variant, status, border, size, icon, attributes.className)
  );

  if (shape) _buttonClassName.push(`ar-button-shape ${shape}`);

  if (position) {
    _buttonClassName.push(position.type);
    _buttonClassName.push(position.inset.map((_inset) => _inset).join(" "));
  }

  return (
    <button
      ref={_button}
      {...attributes}
      className={_buttonClassName.map((c) => c).join(" ")}
      onClick={(event) => {
        // Disabled gelmesi durumunda işlem yapmasına izin verme...
        if (attributes.disabled) return;

        (() => {
          const _current = _button.current;
          const addClass = "active";

          if (_current && !_current.classList.contains(addClass)) {
            // Sınıf ekleniyor...
            _current.classList.add(addClass);

            // Sınıf 500 milisaniye sonra kaldırlacak.
            setTimeout(() => _current.classList.remove(addClass), 750);
          }
        })();

        (() => attributes.onClick && attributes.onClick(event))();
      }}
    >
      <span className="text">
        {icon?.element}

        {!shape
          ? typeof children === "string" && upperCase
            ? children.toLocaleUpperCase()
            : children
          : ""}
      </span>
    </button>
  );
};

Button.displayName = "Button";

export default Button;
