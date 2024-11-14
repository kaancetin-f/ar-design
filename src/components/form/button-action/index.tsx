"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/button-action/button-action.css";
import IProps from "./IProps";
import Button from "../button";

const ButtonAction: React.FC<IProps> = ({ buttons }) => {
  // refs
  const _arButtonAction = useRef<HTMLDivElement>(null);
  const _list = useRef<HTMLDivElement>(null);

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [coordinateX, setCoordinatX] = useState<number>(0);
  const [coordinateY, setCoordinatY] = useState<number>(0);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arButtonAction.current && !_arButtonAction.current.contains(target)) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handleResizeEvent = () => setOpen(false);

  // useEffects
  useEffect(() => {
    if (open) {
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
    <div ref={_arButtonAction} className="ar-button-action">
      <Button
        variant="borderless"
        status="information"
        border={{ radius: "none" }}
        icon={{ element: <span className="dotted"></span> }}
        onClick={() => {
          if (!_arButtonAction.current || !_list.current) return;

          const wrapper = _arButtonAction.current.getBoundingClientRect();
          const confirm = _list.current.getBoundingClientRect();

          setCoordinatX(wrapper.left - confirm.width - 60);
          setCoordinatY(wrapper.top);

          setOpen((prev) => !prev);
        }}
      />

      <span
        ref={_list}
        className={`list ${open ? "opened" : "closed"}`}
        style={{ top: coordinateY, left: coordinateX }}
      >
        {buttons.map((button) => (
          <Button variant="borderless" status="dark" onClick={button.onClick}>
            {button.text}
          </Button>
        ))}
      </span>
    </div>
  );
};

ButtonAction.displayName = "ButtonAction";

export default ButtonAction;
