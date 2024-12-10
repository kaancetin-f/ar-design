"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/notification/notification.css";

const Notification = ({ title, message, status, direction = "bottom-left", trigger }: IProps) => {
  // useRefs
  const _firstLoad = useRef<boolean>(false);
  const _index = useRef<number>(0);
  const _interval = useRef<NodeJS.Timeout>();

  // useStates
  const [items, setItems] = useState<{ index: number; element: JSX.Element }[]>([]);

  // useEffects
  useEffect(() => {
    if (!_firstLoad.current) {
      _firstLoad.current = true;

      return;
    }

    _index.current += 1;

    const createItem = (
      <div className={`item ${status}`}>
        {/* <div className="icon">
          <span className={status}></span>
          <span className={status}></span>
          <span className={status}></span>
          <span className={status}></span>
          <span className={status}></span>
        </div> */}

        <div className="content">
          <span className={`title ${status}`}>{title}</span>
          <span className="message">{message}</span>
        </div>

        <div
          className="close"
          data-index={_index.current}
          onClick={(event) => {
            const target = event.currentTarget as HTMLDivElement;

            setItems((item) => item.filter((x) => x.index !== Number(target.dataset.index)));
          }}
        >
          {/* <FontAwesomeIcon icon={faClose} /> */}x
        </div>
      </div>
    );

    setItems((items) => [...items, { index: _index.current, element: createItem }]);
  }, [trigger]);

  useEffect(() => {
    if (items.length === 0) return;

    // Ekleme işlemi bittikten bir süre sonra tekrar kaldırma işlemi yapılmaktadır.
    _interval.current = setTimeout(() => {
      setItems((items) => items.slice(0, -1));

      clearTimeout(_interval.current);
    }, 3000);
  }, [items]);

  return (
    <div className={`notification ${direction}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{item.element}</React.Fragment>
      ))}
    </div>
  );
};

export default Notification;
