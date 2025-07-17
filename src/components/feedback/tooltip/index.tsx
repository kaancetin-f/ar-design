"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const handlePosition = useCallback(() => {
    if (_children.current && _arTooltip.current) {
      const childRect = _children.current.getBoundingClientRect();
      const tooltipRect = _arTooltip.current.getBoundingClientRect();

      if (childRect) {
        const sx = window.scrollX || document.documentElement.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop;

        // Tooltip konumunu ayarlama için ortak bir fonksiyon.
        const setTooltipPosition = (top: number, left: number) => {
          if (!_arTooltip.current) return;

          _arTooltip.current.style.top = `${top + sy}px`;
          _arTooltip.current.style.left = `${left + sx}px`;
        };

        const margin = 17.5;

        let top = 0;
        let left = 0;

        switch (direction) {
          case "top":
            {
              top = childRect.top - tooltipRect.height - margin;
              left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;

              setTooltipPosition(top, left);
            }
            break;
          case "right":
            {
              top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
              left = childRect.right + margin;

              setTooltipPosition(top, left);
            }
            break;
          case "bottom":
            {
              top = childRect.bottom + margin;
              left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;

              setTooltipPosition(top, left);
            }
            break;
          case "left":
            {
              top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
              left = childRect.left - tooltipRect.width - margin;

              setTooltipPosition(top, left);
            }
            break;
        }
      }
    }
  }, []);

  //useEffects
  useEffect(() => {
    if (mouseEnter) setTimeout(() => handlePosition(), 0);
  }, [mouseEnter]);

  return (
    <div className="ar-tooltip-wrapper">
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
