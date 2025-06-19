"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/popup/popup.css";
import Button from "../../form/button";
import ReactDOM from "react-dom";
import { NotificationContext } from "../../../libs/core/application/contexts/Notification";

const Popup = ({ title, message, status, isOpen, buttons }: IProps) => {
  // contexts
  const { setIsPopupOpen } = useContext(NotificationContext);

  // refs
  const _arNotificationPopupWrapper = useRef<HTMLDivElement>(null);
  const _arNotificationPopup = useRef<HTMLDivElement>(null);

  // states
  const _notificaitonPopupWrapperClassName: string[] = ["ar-notification-popup-wrapper"];
  const [className, setClassName] = useState<string[]>(["ar-notification-popup", ""]);

  // useEffects
  useEffect(() => {
    setClassName((prev) => {
      const updated = [...prev.slice(0, -1), isOpen ? "open" : ""];

      return updated;
    });

    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div ref={_arNotificationPopupWrapper} className={_notificaitonPopupWrapperClassName.map((c) => c).join(" ")}>
        <div
          className="ar-notification-popup-bg"
          onMouseDown={(event) => {
            event.stopPropagation();

            const target = event.target as HTMLElement;
            if (_arNotificationPopup.current && !_arNotificationPopup.current.contains(target)) {
              setClassName((prev) => {
                const updated = [...prev.slice(0, -1), isOpen ? "open" : ""];

                return updated;
              });
            }
          }}
        ></div>

        <div ref={_arNotificationPopup} className={className.map((c) => c).join(" ")}>
          <div className={`icon ${status}`}></div>

          <div className="content">
            <span className={`title ${status}`}>{title}!</span>
            <span className="message">{message}</span>
          </div>

          <Button
            variant="filled"
            status={status == "success" ? "success" : "danger"}
            onClick={() => {
              (() => buttons?.okay?.onClick && buttons.okay?.onClick())();

              (() => {
                setIsPopupOpen && setIsPopupOpen((prev) => !prev);
              })();
            }}
          >
            {buttons?.okay?.text ?? "Tamam"}
          </Button>
        </div>
      </div>,
      document.body
    )
  );
};

export default Popup;
