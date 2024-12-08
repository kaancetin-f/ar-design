"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/feedback/confirm/confirm.css";
import Button from "../../form/button";
import Typography from "../../data-display/typography";
import IProps from "./IProps";

const { Title } = Typography;

const Confirm: React.FC<IProps> = ({ children, title, message, content, onConfirm }) => {
  // refs
  const _arConfirmWrapper = useRef<HTMLDivElement>(null);
  const _arConfirm = useRef<HTMLDivElement>(null);

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [coordinateX, setCoordinatX] = useState<number>(0);
  const [coordinateY, setCoordinatY] = useState<number>(0);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arConfirm.current && !_arConfirm.current.contains(target)) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handleScroll = () => {
    if (!_arConfirmWrapper.current || !_arConfirm.current) return;

    const wrapper = _arConfirmWrapper.current.getBoundingClientRect();
    const confirm = _arConfirm.current.getBoundingClientRect();

    setCoordinatX(wrapper.left - confirm.width - 10);
    setCoordinatY(wrapper.top);
  };

  // useEffects
  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
      document.addEventListener("scroll", handleScroll);

      // Dinleyicileri kaldır.
      return () => {
        document.removeEventListener("click", handleClickOutSide);
        document.removeEventListener("keydown", handleKeys);
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open]);

  return (
    <div ref={_arConfirmWrapper} className="ar-confirm-wrapper" role="dialog">
      <div
        ref={_arConfirm}
        className={`ar-confirm ${open ? "opened" : "closed"}`}
        style={{ top: coordinateY, left: coordinateX }}
      >
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
      </div>

      <div
        onClick={() => {
          handleScroll();
          setOpen((prev) => !prev);
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Confirm;
