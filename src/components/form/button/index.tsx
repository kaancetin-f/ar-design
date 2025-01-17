"use client";

import React, { useRef } from "react";
import "../../../assets/css/components/form/button/styles.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";
import Tooltip from "../../feedback/tooltip";

const Button: React.FC<IProps> = ({
  children,
  variant = "filled",
  shape,
  status = "primary",
  border,
  size = "normal",
  tooltip,
  position,
  icon,
  upperCase,
  ...attributes
}) => {
  // refs
  const _button = useRef<HTMLButtonElement>(null);
  const _buttonClassName: string[] = ["ar-button"];

  _buttonClassName.push(...Utils.GetClassName(variant, status, border, size, icon, attributes.className));

  if (!children) _buttonClassName.push("no-content");

  if (shape) _buttonClassName.push(`ar-button-shape ${shape}`);

  if (position) {
    _buttonClassName.push(position.type);
    _buttonClassName.push(position.inset.map((_inset) => _inset).join(" "));
  }

  const buttonElement: React.JSX.Element = (
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

        <span>
          {!shape ? (typeof children === "string" && upperCase ? children.toLocaleUpperCase() : children) : ""}
        </span>
      </span>
    </button>
  );

  return !tooltip ? (
    buttonElement
  ) : (
    <Tooltip text={tooltip.text} direction={tooltip.direction}>
      {buttonElement}
    </Tooltip>
  );
};

Button.displayName = "Button";

export default Button;
