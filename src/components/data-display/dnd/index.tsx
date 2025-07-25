"use client";

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/dnd/dnd.css";
import { ARIcon } from "../../icons";

const DnD = function <T>({ data, renderItem, onChange }: IProps<T>) {
  // refs
  const _arDnD = useRef<HTMLDivElement>(null);
  const _dragItem = useRef<HTMLElement>();

  // useEffects
  useEffect(() => {
    if (!_arDnD.current || data.length === 0) return;

    _arDnD.current.childNodes.forEach((item) => {
      const _item = item as HTMLElement;

      // Events
      _item.ondragstart = (event) => {
        const dragItem = event.currentTarget as HTMLElement;

        _dragItem.current = dragItem;
        dragItem.classList.add("drag-item");

        // Korumaya başla
        if (_arDnD.current) {
          _arDnD.current.childNodes.forEach((item) => {
            const firewall = document.createElement("div");
            firewall.setAttribute("data-id", "ar-firewall");
            firewall.style.position = "absolute";
            firewall.style.inset = "0";

            item.appendChild(firewall);
          });
        }
      };

      _item.ondragover = (event) => {
        event.preventDefault();

        const overItem = event.currentTarget as HTMLElement;
        const rect = overItem.getBoundingClientRect();

        if (rect.top < 250) window.scrollBy(0, -20);
        if (rect.bottom > window.innerHeight - 150) window.scrollBy(0, 20);

        const nodes = document.querySelectorAll("[data-id='ar-firewall']");
        nodes.forEach((node) => node.remove());

        if (_dragItem.current !== overItem) {
          if (_arDnD.current && _dragItem.current) {
            const dragItemIndex = [..._arDnD.current.children].indexOf(_dragItem.current!);
            const dropItemIndex = [..._arDnD.current.children].indexOf(overItem);

            if (dragItemIndex < dropItemIndex) {
              _arDnD.current.insertBefore(_dragItem.current, overItem.nextSibling);
            } else {
              _arDnD.current.insertBefore(_dragItem.current, overItem);
            }

            data.splice(dropItemIndex, 0, data.splice(dragItemIndex, 1)[0]);
          }

          onChange(data);
        }
      };

      _item.ondragend = (event) => {
        const item = event.currentTarget as HTMLElement;
        item.classList.remove("drag-item");
        item.classList.add("end-item");

        setTimeout(() => {
          item.classList.remove("end-item");

          if (item.classList.length === 0) item.removeAttribute("class");
        }, 1000);
      };
    });

    _arDnD.current.ondragover = (event) => event.preventDefault();
  }, [data]);

  return (
    <div ref={_arDnD} className="ar-dnd">
      {data.map((item, index) => (
        <div key={index} draggable>
          <div className="move">
            <ARIcon icon={"GripVertical"} fill="var(--blue-500)" size={18} />
          </div>
          <div className="content">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
};

export default DnD;
