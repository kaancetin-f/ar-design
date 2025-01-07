"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/button/button.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";
import ReactDOM from "react-dom";

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
  const _arButtonTooltip = useRef<HTMLDivElement>(null);
  const _buttonClassName: string[] = ["ar-button"];

  _buttonClassName.push(...Utils.GetClassName(variant, status, border, size, icon, attributes.className));

  if (!children) _buttonClassName.push("no-content");

  if (shape) _buttonClassName.push(`ar-button-shape ${shape}`);

  if (position) {
    _buttonClassName.push(position.type);
    _buttonClassName.push(position.inset.map((_inset) => _inset).join(" "));
  }

  // states
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

  // methods
  const handlePosition = () => {
    if (_button.current && _arButtonTooltip.current) {
      const buttonR = _button.current.getBoundingClientRect();
      const tooltipR = _arButtonTooltip.current.getBoundingClientRect();

      if (buttonR) {
        const sx = window.scrollX || document.documentElement.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop;

        if (tooltip) {
          // Tooltip konumunu ayarlama için ortak bir fonksiyon.
          const setTooltipPosition = (top: number, left: number) => {
            if (!_arButtonTooltip.current) return;

            _arButtonTooltip.current.style.top = `${top + sy}px`;
            _arButtonTooltip.current.style.left = `${left + sx}px`;
          };

          const positonT = buttonR.top;
          const positonL = buttonR.left + (sx == 0 ? 5.5 : 0);
          const centerBX = buttonR.width / 2;
          const centerBY = buttonR.height / 2;
          const centerV = positonL - tooltipR.width + tooltipR.width / 2 + centerBX;
          const margin = 17.5;

          switch (tooltip.direction) {
            case "top":
              {
                const top = positonT - tooltipR.height - margin;
                const left = centerV;

                setTooltipPosition(top, left);
              }
              break;
            case "right":
              {
                const top = positonT + centerBY - tooltipR.height / 2;
                const left = positonL + buttonR.width + margin;

                setTooltipPosition(top, left);
              }
              break;
            case "bottom":
              {
                const top = positonT + buttonR.height + margin;
                const left = centerV;

                setTooltipPosition(top, left);
              }
              break;
            case "left":
              {
                const top = positonT + centerBY - tooltipR.height / 2;
                const left = positonL - tooltipR.width - margin;

                setTooltipPosition(top, left);
              }
              break;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (mouseEnter) setTimeout(() => handlePosition(), 0);
  }, [mouseEnter]);

  return (
    <React.Fragment>
      <button
        ref={_button}
        {...attributes}
        onMouseEnter={(event) => {
          // Disabled gelmesi durumunda işlem yapmasına izin verme...
          if (attributes.disabled) return;

          (() => {
            setMouseEnter(true);
          })();

          (() => attributes.onMouseEnter && attributes.onMouseEnter(event))();
        }}
        onMouseLeave={(event) => {
          // Disabled gelmesi durumunda işlem yapmasına izin verme...
          if (attributes.disabled) return;

          (() => {
            setMouseEnter(false);
          })();

          (() => attributes.onMouseLeave && attributes.onMouseLeave(event))();
        }}
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

      {tooltip &&
        mouseEnter &&
        ReactDOM.createPortal(
          <div ref={_arButtonTooltip} className={`ar-button-tooltip ${tooltip.direction}`}>
            <span>{tooltip.text}</span>
          </div>,
          document.body
        )}
    </React.Fragment>
  );
};

Button.displayName = "Button";

export default Button;
