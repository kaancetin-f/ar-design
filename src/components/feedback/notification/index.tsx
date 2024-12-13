"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/notification/notification.css";
import { Direction } from "../../../libs/core/application/contexts/Notification";

const Notification = ({ title, message, status, direction = "bottom-left", trigger }: IProps) => {
  // useRefs
  const _firstLoad = useRef<boolean>(false);
  // const _index = useRef<number>(0);
  const _notificationItems = useRef<(HTMLDivElement | null)[]>([]);
  const _interval = useRef<NodeJS.Timeout>();

  // useStates
  const [items, setItems] = useState<{ title: string; message?: string; status: string; direction: Direction }[]>([]);

  // useEffects
  useEffect(() => {
    if (!_firstLoad.current) {
      _firstLoad.current = true;

      return;
    }

    setItems((items) => [...items, { title, message, status, direction }]);
  }, [trigger]);

  useEffect(() => {
    if (items.length === 0) return;

    // Ekleme işlemi bittikten bir süre sonra tekrar kaldırma işlemi yapılmaktadır.
    _interval.current = setTimeout(() => {
      setItems((items) => items.slice(1));

      clearTimeout(_interval.current);
    }, 300000);
  }, [items]);

  return items.map((item, index) => {
    let bottom: number = 0;

    if (_notificationItems.current[index - 1] && index > 0) {
      const rect = _notificationItems.current[index - 1]!.getBoundingClientRect();
      console.log(rect);

      bottom = rect.height;
    }

    return (
      <div
        ref={(element) => (_notificationItems.current[index] = element)}
        className="ar-notification-item"
        style={{ bottom: `${items.length >= 3 ? index * 10.5 : bottom}px` }}
      >
        <div className="icon">
          <span className={item.status}></span>
          <span className={item.status}></span>
          <span className={item.status}></span>
          <span className={item.status}></span>
          <span className={item.status}></span>
        </div>

        <div className="content">
          <span className="title">{item.title}</span>
          <span className="message">{item.message}</span>
        </div>

        <div
          className="close"
          // data-index={index}
          onClick={(event) => {
            // const target = event.currentTarget as HTMLDivElement;
            // setItems((item) => item.filter((x) => x.index !== Number(target.dataset.index)));
          }}
        ></div>
      </div>
    );
  });
};

export default Notification;
