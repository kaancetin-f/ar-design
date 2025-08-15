"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/popup/popup.css";
import Button from "../../form/button";
import ReactDOM from "react-dom";
import { NotificationContext } from "../../../libs/core/application/contexts/Notification";
import { Color } from "../../../libs/types";
import { ARIcon } from "../../icons";
import Box from "../../data-display/grid-system/box/Box";

const Popup = ({ title, message, status, isOpen, buttons }: IProps) => {
  // contexts
  const { setIsPopupOpen } = useContext(NotificationContext);

  // refs
  const _arNotificationPopupWrapper = useRef<HTMLDivElement>(null);
  const _arNotificationPopup = useRef<HTMLDivElement>(null);

  // states
  const _notificaitonPopupWrapperClassName: string[] = ["ar-notification-popup-wrapper"];
  const [className, setClassName] = useState<string[]>(["ar-notification-popup", ""]);

  // methods
  const buttonColor = (): Color => {
    switch (status) {
      case "success":
        return "green";
      case "warning":
        return "orange";
      case "information":
        return "teal";
      case "error":
        return "red";

      default:
        return "light";
    }
  };
  const buttonIcons = () => {
    switch (status) {
      case "success":
        return <ARIcon icon="CheckAll" fill="var(--white)" size={64} />;
      case "warning":
        return <ARIcon icon="ExclamationDiamond-Fill" fill="var(--white)" size={48} />;
      case "information":
        return "information";
      case "error":
        return <ARIcon icon="XCircle-Fill" fill="var(--white)" size={48} />;

      default:
        return "light";
    }
  };

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
          <div className={`icon ${status}`}>{buttonIcons()}</div>

          <div className="content">
            <span className={`title ${status}`}>{title}!</span>
            <span className="message">{message}</span>
          </div>

          <Box>
            <Button
              variant="filled"
              color={buttonColor()}
              onClick={() => {
                (() => buttons?.okay?.onClick && buttons.okay?.onClick())();

                (() => {
                  setIsPopupOpen && setIsPopupOpen((prev) => !prev);
                })();
              }}
            >
              {buttons?.okay?.text ?? "Tamam"}
            </Button>

            <Button
              variant="filled"
              color="light"
              onClick={() => {
                (() => buttons?.cancel?.onClick && buttons.cancel?.onClick())();

                (() => {
                  setIsPopupOpen && setIsPopupOpen((prev) => !prev);
                })();
              }}
            >
              {buttons?.cancel?.text ?? "İptal"}
            </Button>
          </Box>
        </div>
      </div>,
      document.body
    )
  );
};

export default Popup;
