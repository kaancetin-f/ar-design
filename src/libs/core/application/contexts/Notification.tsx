"use client";

import React, { ReactNode, createContext, useState } from "react";
import Notification from "../../../../components/feedback/notification";
import Popup from "../../../../components/feedback/popup";

export type Status = "success" | "warning" | "information" | "error";
export type Direction = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = {
  children: ReactNode;
  direction: Direction;
};

export type PopupButtonProps = { okay?: { text?: string; onClick?: () => void } };

type NotificationContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<Status | number>>;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupButtons: React.Dispatch<React.SetStateAction<PopupButtonProps | null>>;
};

const NotificationContext = createContext<Partial<NotificationContextProps>>({});

const NotificationProvider = ({ children, direction }: Props) => {
  const [title, setTitle] = useState<string>("Example");
  const [message, setMessage] = useState<string>(
    "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir."
  );
  const [status, setStatus] = useState<Status | number>("success");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupButtons, setPopupButtons] = useState<PopupButtonProps | null>(null);

  return (
    <NotificationContext.Provider
      value={{
        setTitle,
        setMessage,
        setStatus,
        setTrigger,
        setIsPopupOpen,
        setPopupButtons,
      }}
    >
      {children}

      <Notification title={title} message={message} status={status} direction={direction} trigger={trigger} />
      <Popup title={title} message={message} status={status} isOpen={isPopupOpen} buttons={popupButtons} />
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
