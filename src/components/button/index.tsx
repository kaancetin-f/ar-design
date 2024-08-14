"use client";

import React, { useRef } from "react";
import { Props } from "./type";
import "../../libs/styles/button/button.css";

const Button: React.FC<Props> = ({
  children,
  color,
  variant = "filled",
  icon,
  upperCase,
  width,
  ...attributes
}) => {
  // refs
  const _button = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={_button}
      {...attributes}
      className={`ar-button-core ${width} ${variant} ${color ?? "light"} ${
        attributes.className ?? ""
      }`}
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
      {icon && <span className="icon">{icon}</span>}

      {typeof children === "string" && upperCase
        ? children.toLocaleUpperCase()
        : children}
    </button>
  );
};

export default Button;
