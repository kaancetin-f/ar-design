"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/notification/notification.css";
import { Direction } from "../../../libs/core/application/contexts/Notification";

const Notification = ({ title, message, status, direction = "bottom-left", trigger }: IProps) => {
  const _firstLoad = useRef<boolean>(false);
  const _notificationItems = useRef<(HTMLDivElement | null)[]>([]);
  const _interval = useRef<NodeJS.Timeout>();
  const _automaticRemoveInterval = useRef<NodeJS.Timeout>();
  const _closedInterval = useRef<NodeJS.Timeout>();
  const _i = useRef<number>(0);

  const [items, setItems] = useState<
    { id: number; title: string; message?: string; status: string; direction: Direction }[]
  >([]);

  useEffect(() => {
    if (!_firstLoad.current) {
      _firstLoad.current = true;
      return;
    }

    setItems((prevItems) => [...prevItems, { id: _i.current++, title, message, status, direction }]);
  }, [trigger]);

  useEffect(() => {
    if (items.length === 0) return;

    const firstNotification = _notificationItems.current[0];

    _automaticRemoveInterval.current = setTimeout(() => {
      if (firstNotification) firstNotification.classList.add("closed");

      _interval.current = setTimeout(() => {
        setItems((prevItems) => prevItems.slice(1));
        if (firstNotification) firstNotification.classList.remove("closed");

        clearTimeout(_interval.current);
      }, 500);

      clearTimeout(_automaticRemoveInterval.current);
    }, 3000);

    return () => {
      clearTimeout(_automaticRemoveInterval.current);
      clearTimeout(_interval.current);
    };
  }, [items]);

  const getBottomPosition = (index: number): number => {
    let bottom: number = 30; // Başlangıçta 30px'lik bir boşluk ekliyoruz.

    // Önceki öğenin yüksekliğini dikkate alarak bottom hesaplanıyor.
    if (_notificationItems.current[index - 1]) {
      bottom = _notificationItems.current.slice(0, index).reduce((acc, el) => {
        const rect = el!.getBoundingClientRect();

        return acc + rect.height + 20; // +20 değeri ara boşluğu artıyor.
      }, 30); // 30px'lik boşluğu başlangıçta ekliyoruz.
    }

    return bottom;
  };

  return items.map((item, index) => {
    const bottom = getBottomPosition(index);

    return (
      <div
        key={index}
        ref={(element) => (_notificationItems.current[index] = element)}
        className="ar-notification-item"
        style={
          items.length > 5
            ? {
                backgroundColor: `rgba(var(--white-rgb), ${index === items.length - 1 ? 1 : 0.1})`,
                backdropFilter: "blur(10px)",
                bottom: (index === 0 ? 30 : 10) * (index + 1),
              }
            : { bottom }
        }
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
          onClick={() => {
            clearTimeout(_automaticRemoveInterval.current);
            clearTimeout(_interval.current);

            if (_notificationItems.current[index]) _notificationItems.current[index]!.classList.add("closed");

            _closedInterval.current = setTimeout(() => {
              setItems((prev) => prev.filter((_item) => _item.id !== item.id));

              if (_notificationItems.current[index]) _notificationItems.current[index]!.classList.remove("closed");

              clearTimeout(_closedInterval.current);
            }, 500);
          }}
        ></div>
      </div>
    );
  });
};

export default Notification;
