"use client";

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/dnd/dnd.css";
import { ARIcon } from "../../icons";

let _fromColumn: string | undefined = undefined;

const DnD = function <T>({ data, renderItem, columnKey, onChange }: IProps<T>) {
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

        const index = [..._arDnD.current!.children].indexOf(dragItem);
        const draggedData = data[index];

        if (event.dataTransfer) {
          event.dataTransfer.setData("item", JSON.stringify(draggedData));
          event.dataTransfer.setData("fromColumn", columnKey ?? "");
          _fromColumn = columnKey ?? undefined;
        }

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
        if (columnKey && _fromColumn !== columnKey) return;

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

            // invalid drag/drop durumlarını engelle
            if (dragItemIndex === -1 || dropItemIndex === -1) return;

            _arDnD.current.insertBefore(
              _dragItem.current,
              dragItemIndex < dropItemIndex ? overItem.nextSibling : overItem
            );

            const cloned = [...data];
            const movedItem = cloned.splice(dragItemIndex, 1)[0];

            if (!movedItem) return;

            cloned.splice(dropItemIndex, 0, movedItem);
            onChange(cloned);
          }
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

    return () => {
      _arDnD.current?.childNodes.forEach((item) => {
        const _item = item as HTMLElement;
        _item.ondragstart = null;
        _item.ondragover = null;
        _item.ondragend = null;
      });
    };
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
