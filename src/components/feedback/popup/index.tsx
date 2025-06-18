"use client";

import React, { useContext, useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/popup/popup.css";
import Button from "../../form/button";
import ReactDOM from "react-dom";
import { NotificationContext } from "../../../libs/core/application/contexts/Notification";

const Popup = ({ title, message, status, isOpen, buttons }: IProps) => {
  const { setIsPopupOpen } = useContext(NotificationContext);
  // states
  const [className, setClassName] = useState<string[]>(["ar-notification-popup", ""]);

  // useEffects
  useEffect(() => {
    setClassName((prev) => {
      const updated = [...prev.slice(0, -1), isOpen ? "open" : ""];

      return updated;
    });
  }, [isOpen]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={className.map((c) => c).join(" ")}>
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
      </div>,
      document.body
    )
  );
};

export default Popup;
