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

    // Önceki öğenin yüksekliğini dikkate alarak `bottom` hesaplanıyor.
    if (_notificationItems.current[index - 1] && index > 0) {
      bottom = _notificationItems.current.slice(0, index).reduce((acc, el) => {
        const rect = el!.getBoundingClientRect();
        return acc + rect.height + 20; // Önceki öğelerin yüksekliğini topluyoruz.
      }, 0);
    }

    return (
      <div
        key={index}
        ref={(element) => (_notificationItems.current[index] = element)}
        className="ar-notification-item"
        style={{ bottom: `${items.length > 5 ? index * 10.5 : bottom}px` }}
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

        <div className="close" onClick={() => setItems((items) => items.filter((_, _index) => _index !== index))}></div>
      </div>
    );
  });
};

export default Notification;
