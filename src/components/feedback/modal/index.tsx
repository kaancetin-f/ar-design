"use client";

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/modal/modal.css";
import Typography from "../../data-display/typography";

const { Title } = Typography;

const Modal: React.FC<IProps> = ({ children, open, title, size = "normal", footer }) => {
  // refs
  const _arModal = useRef<HTMLDivElement>(null);
  const _modalWrapperClassName: string[] = ["ar-modal-wrapper"];
  const _modalClassName: string[] = ["ar-modal", size];

  if (Object.keys(open).length > 0 && open.get) _modalWrapperClassName.push("opened");
  else _modalWrapperClassName.push("closed");

  // methods
  // const handleClickOutSide = (event: MouseEvent) => {
  //   const target = event.target as HTMLElement;

  //   if (_arModal.current && !_arModal.current.contains(target)) open.set(false);
  // };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") open.set(false);
  };

  // useEffects
  useEffect(() => {
    if (open.get) {
      document.body.style.overflow = "hidden";
      // document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      document.body.style.removeProperty("overflow");
      // document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open.get]);

  return (
    <div className={_modalWrapperClassName.map((c) => c).join(" ")}>
      <div
        className="ar-modal-bg"
        onMouseDown={(event) => {
          event.stopPropagation();

          const target = event.target as HTMLElement;
          if (_arModal.current && !_arModal.current.contains(target)) open.set(false);
        }}
      ></div>

      <div ref={_arModal} className={_modalClassName.map((c) => c).join(" ")} role="dialog">
        <div className="header">
          <Title Level="h3">{title}</Title>

          <div className="close" onClick={() => open.set((prev) => !prev)}></div>
        </div>

        <div className="content">{children}</div>

        {footer && <div className="footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
