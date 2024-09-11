"use client";

import React, { useRef } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/form/button/button.css";

const Button: React.FC<Props> = ({
  children,
  variant = "filled",
  shape,
  color = "primary",
  border,
  width = "auto",
  size = "normal",
  position,
  icon,
  upperCase,
  ...attributes
}) => {
  // refs
  const _button = useRef<HTMLButtonElement>(null);
  let _buttonClassName = useRef<string>(`ar-button ${variant} ${color} ${width}`).current;
  let _spanClassName = useRef<string>(`text`).current;

  // button className
  if (shape) _buttonClassName += ` ar-button-shape ${shape}`;

  if (border) {
    if (variant !== "filled" && border.style) _buttonClassName += ` border-style-${border.style}`;
    if (border.radius) _buttonClassName += ` border-radius-${border?.radius}`;
  }

  if (size) _buttonClassName += ` ${size}`;

  if (position) {
    _buttonClassName += ` ${position.type}`;
    _buttonClassName += ` ${position.inset.map((_inset) => _inset).join(" ")}`;
  }

  if (attributes.className) _buttonClassName += ` ${attributes.className}`;

  // span className
  if (icon) {
    if (icon.element && !shape) _spanClassName += ` icon`;
    if (icon.direction) _spanClassName += ` icon-${icon.direction}`;
    if (icon.position) _spanClassName += ` icon-${icon.direction ?? "row"}-${icon.position}`;
  }

  return (
    <button
      ref={_button}
      {...attributes}
      className={_buttonClassName}
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
      <span className={_spanClassName}>
        {icon?.element}

        {typeof children === "string" && upperCase ? children.toLocaleUpperCase() : children}
      </span>
    </button>
  );
};

Button.displayName = "Button";

export default Button;
