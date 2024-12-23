"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/feedback/confirm/confirm.css";
import Button from "../../form/button";
import Typography from "../../data-display/typography";
import IProps from "./IProps";
import ReactDOM from "react-dom";

const { Title } = Typography;

const Confirm: React.FC<IProps> = ({ children, title, message, content, onConfirm }) => {
  // refs
  const _arConfirmWrapper = useRef<HTMLDivElement>(null);
  const _arConfirm = useRef<HTMLDivElement>(null);
  const _arConfirmElement = useRef<HTMLDivElement>(null);

  // states
  const [open, setOpen] = useState<boolean>(false);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arConfirm.current && !_arConfirm.current.contains(target)) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handlePosition = () => {
    if (_arConfirmWrapper.current && _arConfirm.current && _arConfirmElement.current) {
      const confirmRect = _arConfirm.current.getBoundingClientRect();
      const elementRect = _arConfirmElement.current.getBoundingClientRect();

      if (elementRect) {
        const screenCenter = window.innerHeight / 2;
        const sx = window.scrollX || document.documentElement.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop;

        _arConfirm.current.style.top = `${
          (elementRect.top > screenCenter
            ? elementRect.top - confirmRect.height + elementRect.height
            : elementRect.top) + sy
        }px`;
        _arConfirm.current.style.left = `${elementRect.left - confirmRect.width + sx - 10}px`;
      }
    }
  };

  // useEffects
  useEffect(() => {
    if (open) {
      handlePosition();

      window.addEventListener("blur", () => setOpen(false));
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      window.removeEventListener("blur", () => setOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open]);

  return (
    <div ref={_arConfirmWrapper} className="ar-confirm-wrapper" role="dialog">
      {open &&
        ReactDOM.createPortal(
          <div ref={_arConfirm} className="ar-confirm">
            {title && <Title Level="h4">{title}</Title>}
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
                  Evet
                </Button>

                <Button
                  status="light"
                  size="small"
                  onClick={() => {
                    onConfirm(false);
                    setOpen(false);
                  }}
                >
                  Hayır
                </Button>
              </div>
            )}
          </div>,
          document.body
        )}

      <div ref={_arConfirmElement} onClick={() => setOpen((prev) => !prev)}>
        {children}
      </div>
    </div>
  );
};

export default Confirm;
