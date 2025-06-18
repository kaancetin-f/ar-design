"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/feedback/popover/styles.css";
import Button from "../../form/button";
import Typography from "../../data-display/typography";
import IProps from "./IProps";
import ReactDOM from "react-dom";

const { Title } = Typography;

const Popover: React.FC<IProps> = ({ children, title, message, content, onConfirm, windowBlur, fullWidth, config }) => {
  // refs
  const _arPopoverWrapper = useRef<HTMLDivElement>(null);
  const _arPopover = useRef<HTMLDivElement>(null);
  const _arPopoverElement = useRef<HTMLDivElement>(null);
  const _arPopoverClassName: string[] = ["ar-popover-wrapper"];

  if (fullWidth) _arPopoverClassName.push("full-width");

  // states
  const [open, setOpen] = useState<boolean>(false);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arPopover.current && !_arPopover.current.contains(target)) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handlePosition = () => {
    if (_arPopoverWrapper.current && _arPopover.current && _arPopoverElement.current) {
      const popoverRect = _arPopover.current.getBoundingClientRect();
      const elementRect = _arPopoverElement.current.getBoundingClientRect();

      if (elementRect) {
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const sx = window.scrollX || document.documentElement.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop;

        _arPopover.current.style.visibility = "visible";
        _arPopover.current.style.opacity = "1";
        _arPopover.current.style.top = `${
          (elementRect.top > screenCenterY
            ? elementRect.top - popoverRect.height + elementRect.height
            : elementRect.top) + sy
        }px`;
        _arPopover.current.style.left = `${
          (elementRect.left > screenCenterX
            ? elementRect.right - (elementRect.width + 7.5) - popoverRect.width
            : elementRect.left + elementRect.width + 7.5) + sx
        }px`;
      }
    }
  };

  // useEffects
  useEffect(() => {
    if (open) {
      setTimeout(() => handlePosition(), 0);

      !windowBlur && window.addEventListener("blur", () => setOpen(false));
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      !windowBlur && window.removeEventListener("blur", () => setOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open]);

  return (
    <div ref={_arPopoverWrapper} className={_arPopoverClassName.map((c) => c).join(" ")} role="dialog">
      {open &&
        ReactDOM.createPortal(
          <div ref={_arPopover} className="ar-popover">
            {title && (
              <div className="title">
                <Title Level="h4">{title}</Title>
              </div>
            )}
            {message && <p className="message">{message}</p>}
            {content && <div className="content">{content}</div>}

            {onConfirm && (
              <div className="footer">
                <Button
                  status="success"
                  size="small"
                  onClick={() => {
                    onConfirm(true);
                    setOpen(false);
                  }}
                >
                  {config?.buttons.okay ?? "Evet"}
                </Button>

                <Button
                  status="light"
                  size="small"
                  onClick={() => {
                    onConfirm(false);
                    setOpen(false);
                  }}
                >
                  {config?.buttons.cancel ?? "Hayır"}
                </Button>
              </div>
            )}
          </div>,
          document.body
        )}

      <div ref={_arPopoverElement} onClick={() => setOpen((prev) => !prev)}>
        {children}
      </div>
    </div>
  );
};

export default Popover;
