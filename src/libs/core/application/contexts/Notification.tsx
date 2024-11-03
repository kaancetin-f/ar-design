"use client";

import React, { ReactNode, createContext, useState } from "react";
import Notification from "../../../../components/feedback/notification";

export type Status = "success" | "warning" | "information" | "error";
export type Direction = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = {
  children: ReactNode;
  direction: Direction;
};

type NotificationContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationContext = createContext<Partial<NotificationContextProps>>({});

const NotificationProvider = ({ children, direction }: Props) => {
  const [title, setTitle] = useState<string>("Example");
  const [message, setMessage] = useState<string>(
    "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir."
  );
  const [status, setStatus] = useState<Status>("success");
  const [trigger, setTrigger] = useState<boolean>(false);

  return (
    <NotificationContext.Provider
      value={{
        setTitle,
        setMessage,
        setStatus,
        setTrigger,
      }}
    >
      {children}

      <Notification
        title={title}
        message={message}
        status={status}
        direction={direction}
        trigger={trigger}
      />
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
