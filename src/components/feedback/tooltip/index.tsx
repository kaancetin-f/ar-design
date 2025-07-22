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
  const [_direction, setDirection] = useState<string>(direction);

  // methods
  const handlePosition = useCallback(() => {
    const child = _children.current;
    const tooltip = _arTooltip.current;

    if (!child || !tooltip) return;

    const margin = 17.5;
    const windowWidth = window.innerWidth;
    const screenCenterX = windowWidth / 2;

    const childRect = child.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const isOnRight = childRect.left > screenCenterX;

    if (direction === "top" || direction === "bottom") {
      if (isOnRight && tooltipRect.right > windowWidth - 10) {
        direction = "left";
      } else if (!isOnRight && tooltipRect.left < 10) {
        direction = "right";
      }
    }

    let top = 0;
    let left = 0;

    switch (direction) {
      case "top":
        top = childRect.top - tooltipRect.height - margin;
        left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;
        break;
      case "right":
        top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
        left = childRect.right + margin;
        break;
      case "bottom":
        top = childRect.bottom + margin;
        left = childRect.left + childRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
        left = childRect.left - tooltipRect.width - margin;
        break;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    setDirection(direction);
  }, []);

  //useEffects
  useEffect(() => {
    const observer = new MutationObserver(() => {
      handlePosition();
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
          <div ref={_arTooltip} className={`ar-tooltip ${_direction}`}>
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
