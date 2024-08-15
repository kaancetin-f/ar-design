"use client";

import React, { useRef } from "react";
import { Props } from "./type";
import "../../libs/styles/button/button.css";

const Button: React.FC<Props> = ({
  children,
  variant = "filled",
  shape,
  color = "primary",
  border,
  width = "auto",
  icon,
  upperCase,
  ...attributes
}) => {
  // refs
  const _button = useRef<HTMLButtonElement>(null);

  // methods
  const handleClassName = () => {
    let className: string = `ar-button-core ${variant} ${color} ${width}`;

    if (shape) className += ` ar-button-shape ${shape}`;

    if (variant !== "filled" && border) {
      if (border.style) className += ` border-style-${border.style}`;
      if (border.radius) className += ` border-radius-${border?.radius}`;
    }

    if (icon) {
      if (icon.element && !shape) className += ` icon`;
      if (icon.direction) className += ` icon-${icon.direction}`;
    }
    if (attributes.className) className += ` ${attributes.className}`;

    return className;
  };

  return (
    <button
      ref={_button}
      {...attributes}
      className={handleClassName()}
      onClick={(event) => {
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
      {icon?.element}

      {typeof children === "string" && upperCase
        ? children.toLocaleUpperCase()
        : children}
    </button>
  );
};

export default Button;
