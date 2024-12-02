"use client";

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/dnd/dnd.css";

const DnD = function <T>({ data, renderItem, onChange }: IProps<T>) {
  // refs
  const _arDnD = useRef<HTMLDivElement>(null);
  const _dragItem = useRef<HTMLElement>();

  useEffect(() => {
    if (!_arDnD.current || data.length === 0) return;

    _arDnD.current.childNodes.forEach((item) => {
      const targetItem = item as HTMLElement;

      // Events
      targetItem.ondragstart = (event) => {
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

      targetItem.ondragover = (event) => {
        event.preventDefault();

        const overItem = event.currentTarget as HTMLElement;

        if (!overItem.classList.contains("over-item")) {
          overItem.classList.add("over-item");
        }
      };

      targetItem.ondragleave = (event) => {
        const leaveItem = event.currentTarget as HTMLElement;
        leaveItem.classList.remove("over-item");
      };

      targetItem.ondrop = (event) => {
        event.preventDefault();

        const dropItem = event.currentTarget as HTMLElement;

        // Cleaner...
        dropItem.classList.remove("over-item");

        const nodes = document.querySelectorAll("[data-id='ar-firewall']");
        nodes.forEach((node) => node.remove());

        if (_dragItem.current !== dropItem) {
          if (_arDnD.current && _dragItem.current) {
            const dragItemIndex = [..._arDnD.current.children].indexOf(_dragItem.current!);
            const dropItemIndex = [..._arDnD.current.children].indexOf(dropItem);

            if (dragItemIndex < dropItemIndex) {
              // Render Order
              _arDnD.current.insertBefore(_dragItem.current, dropItem.nextSibling);
            } else {
              // Render Order
              _arDnD.current.insertBefore(_dragItem.current, dropItem);
            }

            // Data Order
            data.splice(dropItemIndex, 0, data.splice(dragItemIndex, 1)[0]);
          }

          onChange(data);
        }
      };

      targetItem.ondragend = (event) => {
        const item = event.currentTarget as HTMLElement;
        item.classList.remove("drag-item");

        item.classList.add("end-item");

        setTimeout(() => item.classList.remove("end-item"), 1000);
      };
    });

    _arDnD.current.ondragover = (event) => event.preventDefault();
  }, [data]);

  return (
    <div ref={_arDnD} className="ar-dnd">
      {data.map((item, index) => (
        <div draggable>
          <div className="move">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="content">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
};

export default DnD;
