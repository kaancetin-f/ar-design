"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/feedback/confirm/confirm.css";
import { IChildren } from "../../../libs/types/IGlobalProps";
import Button from "../../form/button";
import Typography from "../../data-display/typography";

const { Title, Paragraph } = Typography;

const Confirm: React.FC<
  {
    title: string;
    message: string;
    onConfirm: (confirm: boolean) => void;
  } & IChildren
> = ({ children, title, message, onConfirm }) => {
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

  const handleResizeEvent = () => {
    if (_arConfirmWrapper.current && _arConfirm.current) {
      const wrapperRect = _arConfirmWrapper.current.getBoundingClientRect();
      const confirm = _arConfirm.current.getBoundingClientRect();

      setCoordinatX(wrapperRect.left - 260);
      setCoordinatY(wrapperRect.top - confirm.height / 2);
    }
  };

  // useEffects
  useEffect(() => {
    if (open) {
      handleResizeEvent();

      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);

      // Sayfa boyutu değiştirilmesi söz konusu olursa eğer bu kısım çalışacaktır.
      window.addEventListener("resize", handleResizeEvent);

      // Dinleyicileri kaldır.
      return () => {
        document.removeEventListener("click", handleClickOutSide);
        document.removeEventListener("keydown", handleKeys);

        window.removeEventListener("resize", handleResizeEvent);
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
        <Title Level="h4">{title}</Title>
        <Paragraph size="small">{message}</Paragraph>
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
            variant="outlined"
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
      </div>

      <div onClick={() => setOpen((prev) => !prev)}>{children}</div>
    </div>
  );
};

export default Confirm;
