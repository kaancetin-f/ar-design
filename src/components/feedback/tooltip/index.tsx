"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import ReactDOM from "react-dom";
import "../../../assets/css/components/feedback/tooltip/styles.css";

const Tooltip: React.FC<IProps> = ({ children, text, direction = "top" }) => {
  // refs
  const _arTooltip = useRef<HTMLDivElement>(null);
  const _children = useRef<HTMLDivElement>(null);

  // states
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

  // methods
  const handlePosition = () => {
    if (_children.current && _arTooltip.current) {
      const buttonR = _children.current.getBoundingClientRect();
      const tooltipR = _arTooltip.current.getBoundingClientRect();

      if (buttonR) {
        const sx = window.scrollX || document.documentElement.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop;

        // Tooltip konumunu ayarlama için ortak bir fonksiyon.
        const setTooltipPosition = (top: number, left: number) => {
          if (!_arTooltip.current) return;

          _arTooltip.current.style.top = `${top + sy}px`;
          _arTooltip.current.style.left = `${left + sx}px`;
        };

        const positonT = buttonR.top;
        const positonL = buttonR.left + (sx == 0 ? 5.5 : 0);
        const centerBX = buttonR.width / 2;
        const centerBY = buttonR.height / 2;
        const centerV = positonL - tooltipR.width + tooltipR.width / 2 + centerBX;
        const margin = 17.5;

        switch (direction) {
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
  };

  //useEffects
  useEffect(() => {
    if (mouseEnter) setTimeout(() => handlePosition(), 0);
  }, [mouseEnter]);

  return (
    <div ref={_arTooltip} className="ar-tooltip-wrapper">
      <div ref={_children} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
        {children}
      </div>

      {mouseEnter &&
        ReactDOM.createPortal(
          <div ref={_arTooltip} className={`ar-tooltip ${direction}`}>
            {Array.isArray(text) ? (
              text.map((t) => (
                <span className="text">
                  <span className="bullet">&#8226;</span>
                  <span>{t}</span>
                </span>
              ))
            ) : (
              <span className="text">{text}</span>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
